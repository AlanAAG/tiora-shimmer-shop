import { useState } from "react";
import { Heart, RotateCcw, Truck, Plus, Minus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ShopifyProductInfoProps {
  product: ShopifyProduct['node'];
}

export const ShopifyProductInfo = ({ product }: ShopifyProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});
  const { addItem, isLoading } = useCartStore();

  const toggleCollapsible = (key: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const variants = product.variants.edges.map(edge => edge.node);
  const selectedVariant = variants[selectedVariantIndex];
  
  const price = parseFloat(selectedVariant?.price.amount || '0');
  const comparePrice = selectedVariant?.compareAtPrice 
    ? parseFloat(selectedVariant.compareAtPrice.amount) 
    : null;
  const currency = selectedVariant?.price.currencyCode || 'USD';
  
  const hasDiscount = comparePrice && comparePrice > price;
  const discount = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleAddToBag = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: product.title,
    });
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Title & Favorite */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
          {product.title}
        </h1>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <Heart
            className={cn(
              "w-6 h-6 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
        </button>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {hasDiscount && comparePrice && (
            <span className="text-muted-foreground line-through text-sm">
              {formatPrice(comparePrice)}
            </span>
          )}
          <span className="font-display text-2xl text-foreground">
            {formatPrice(price)}
          </span>
          {hasDiscount && comparePrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 font-body tracking-wide rounded-lg">
              SAVE {formatPrice(comparePrice - price)}
            </span>
          )}
        </div>
        {hasDiscount && (
          <p className="text-red-500 text-sm font-body">{discount}% off. No code needed.</p>
        )}
      </div>

      {/* Variant Selection */}
      {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
        <div className="space-y-3">
          {product.options.map((option, optionIndex) => (
            <div key={option.name} className="space-y-2">
              <p className="font-body text-sm text-foreground">
                {option.name}: <span className="font-medium">{selectedVariant?.selectedOptions[optionIndex]?.value}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value, valueIndex) => {
                  const variantForValue = variants.find(v => 
                    v.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                  );
                  const isSelected = selectedVariant?.selectedOptions.some(
                    opt => opt.name === option.name && opt.value === value
                  );
                  
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        const idx = variants.findIndex(v => 
                          v.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                        );
                        if (idx !== -1) setSelectedVariantIndex(idx);
                      }}
                      disabled={!variantForValue?.availableForSale}
                      className={cn(
                        "py-2 px-4 border text-sm font-body transition-all rounded-xl",
                        isSelected
                          ? "bg-muted border-foreground"
                          : "border-border hover:border-foreground/50",
                        !variantForValue?.availableForSale && "opacity-50 cursor-not-allowed line-through"
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add to Bag Button */}
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full text-base relative overflow-hidden group"
        onClick={handleAddToBag}
        disabled={isLoading || !selectedVariant?.availableForSale}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span className="relative z-10">
              {selectedVariant?.availableForSale ? 'ADD TO BAG' : 'OUT OF STOCK'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </>
        )}
      </Button>

      {/* Description */}
      {product.description && (
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Collapsible Info */}
      <div className="border-t border-border pt-4 space-y-0">
        <Collapsible open={openCollapsibles["returns"]} onOpenChange={() => toggleCollapsible("returns")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span className="font-body text-sm">Easy 14-Day Returns</span>
            </div>
            {openCollapsibles["returns"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            We offer free returns within 14 days of delivery. Items must be unworn and in their original packaging.
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        <Collapsible open={openCollapsibles["shipping"]} onOpenChange={() => toggleCollapsible("shipping")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4" />
              <span className="font-body text-sm">Free Shipping Available</span>
            </div>
            {openCollapsibles["shipping"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            Enjoy free standard shipping on qualifying orders. Express shipping available for an additional fee.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
