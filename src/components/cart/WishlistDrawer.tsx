import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useLocalWishlist } from "@/hooks/useLocalWishlist";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";

export const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlistedIds, toggle } = useLocalWishlist();
  const { data: allProducts, isLoading } = useShopifyProducts(100);
  const addItem = useCartStore((s) => s.addItem);

  const count = wishlistedIds.size;

  // Filter products that are wishlisted
  const wishlistProducts = allProducts?.filter((p) =>
    wishlistedIds.has(p.node.id)
  ) ?? [];

  const handleAddToBag = async (product: (typeof wishlistProducts)[number]) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title || "Default",
      price: variant.price || { amount: "0", currencyCode: "USD" },
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className={`w-5 h-5 ${count > 0 ? "fill-primary text-primary" : ""}`} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display">Wishlist</SheetTitle>
          <SheetDescription>
            {count === 0 ? "Your wishlist is empty" : `${count} item${count !== 1 ? "s" : ""} saved`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {count === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body">No saved items yet</p>
                <Link to="/shop" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="mt-4">Browse Products</Button>
                </Link>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 min-h-0">
              <div className="space-y-4">
                {wishlistProducts.map((product) => {
                  const variant = product.node.variants.edges[0]?.node;
                  const image = product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={product.node.id} className="flex gap-4 p-2 border-b border-border">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {image && (
                          <img
                            src={image.url}
                            alt={product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm truncate">{product.node.title}</h4>
                        {variant && (
                          <p className="font-body text-sm font-medium mt-1">
                            {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggle(product.node.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleAddToBag(product)}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Add to Bag
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
