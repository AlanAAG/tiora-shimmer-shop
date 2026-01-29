import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: allProducts = [], isLoading } = useShopifyProducts(100);

  // Filter products based on search query
  const filteredProducts = query.length > 0
    ? allProducts.filter((product: ShopifyProduct) => {
        const searchLower = query.toLowerCase();
        const title = product.node.title.toLowerCase();
        const description = product.node.description?.toLowerCase() || "";
        const productType = product.node.productType?.toLowerCase() || "";
        const tags = product.node.tags?.map(t => t.toLowerCase()) || [];
        
        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          productType.includes(searchLower) ||
          tags.some(tag => tag.includes(searchLower))
        );
      }).slice(0, 8) // Limit to 8 results
    : [];

  // Get popular/recent products when no query
  const suggestedProducts = query.length === 0 ? allProducts.slice(0, 5) : [];

  const handleSelect = (handle: string) => {
    navigate(`/product/${handle}`);
    onOpenChange(false);
    setQuery("");
  };

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const getMaterialInfo = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    const materialOption = variant?.selectedOptions?.find(
      opt => opt.name.toLowerCase().includes('material') || opt.name.toLowerCase().includes('jewelry')
    );
    
    if (materialOption) {
      const value = materialOption.value.toLowerCase();
      if (value.includes('gold')) return { text: 'Gold plated', color: 'bg-amber-400' };
      if (value.includes('silver')) return { text: 'Silver plated', color: 'bg-gray-300' };
    }
    
    // Fallback to title check
    const title = product.node.title.toLowerCase();
    if (title.includes('gold')) return { text: 'Gold plated', color: 'bg-amber-400' };
    if (title.includes('silver')) return { text: 'Silver plated', color: 'bg-gray-300' };
    
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] max-w-2xl left-1/2 -translate-x-1/2 top-[20%] translate-y-0 rounded-2xl">
        <VisuallyHidden>
          <DialogTitle>Search Products</DialogTitle>
        </VisuallyHidden>
        <Command className="rounded-2xl border-0" shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4 opacity-50" />
              </button>
            )}
          </div>
          <CommandList className="max-h-[400px] overflow-y-auto">
            {isLoading && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading products...
              </div>
            )}
            
            {!isLoading && query.length > 0 && filteredProducts.length === 0 && (
              <CommandEmpty>No products found for "{query}"</CommandEmpty>
            )}

            {/* Search Results */}
            {filteredProducts.length > 0 && (
              <CommandGroup heading="Products">
                {filteredProducts.map((product: ShopifyProduct) => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const material = getMaterialInfo(product);
                  
                  return (
                    <CommandItem
                      key={product.node.id}
                      value={product.node.handle}
                      onSelect={() => handleSelect(product.node.handle)}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                    >
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.node.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {formatPrice(price.amount, price.currencyCode)}
                          </span>
                          {material && (
                            <span className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${material.color}`} />
                              <span className="text-xs">{material.text}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {/* Suggested Products (when no query) */}
            {query.length === 0 && suggestedProducts.length > 0 && (
              <CommandGroup heading="Popular Products">
                {suggestedProducts.map((product: ShopifyProduct) => {
                  const image = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const material = getMaterialInfo(product);
                  
                  return (
                    <CommandItem
                      key={product.node.id}
                      value={product.node.handle}
                      onSelect={() => handleSelect(product.node.handle)}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                    >
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.node.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {formatPrice(price.amount, price.currencyCode)}
                          </span>
                          {material && (
                            <span className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${material.color}`} />
                              <span className="text-xs">{material.text}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {/* Quick Links */}
            {query.length === 0 && (
              <CommandGroup heading="Quick Links">
                <CommandItem
                  onSelect={() => {
                    navigate("/shop");
                    onOpenChange(false);
                  }}
                  className="cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Products
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    navigate("/shop?collection=best-sellers");
                    onOpenChange(false);
                  }}
                  className="cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Best Sellers
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    navigate("/shop?collection=rings");
                    onOpenChange(false);
                  }}
                  className="cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Rings Collection
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
