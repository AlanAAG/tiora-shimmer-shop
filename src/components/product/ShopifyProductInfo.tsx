import { useState } from "react";
import { Heart, RotateCcw, Truck, Plus, Minus, Loader2, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ShopifyProduct, storefrontApiRequest, CART_CREATE_MUTATION, formatCheckoutUrl } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { PairsWithSection } from "./PairsWithSection";

interface ShopifyProductInfoProps {
  product: ShopifyProduct['node'];
}
export const ShopifyProductInfo = ({
  product
}: ShopifyProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const {
    addItem,
    isLoading
  } = useCartStore();
  const toggleCollapsible = (key: string) => {
    setOpenCollapsibles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const variants = product.variants.edges.map(edge => edge.node);
  const selectedVariant = variants[selectedVariantIndex];
  const price = parseFloat(selectedVariant?.price.amount || '0');
  const comparePrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null;
  const currency = selectedVariant?.price.currencyCode || 'USD';
  const hasDiscount = comparePrice && comparePrice > price;
  const discount = hasDiscount ? Math.round((comparePrice - price) / comparePrice * 100) : 0;

  // Determine material from variant selectedOptions, fallback to title
  const materialOption = selectedVariant?.selectedOptions?.find(
    opt => opt.name.toLowerCase() === "jewelry material"
  );
  const materialValue = materialOption?.value?.toLowerCase() || "";
  const productTitle = product.title.toLowerCase();
  const isSilver = materialValue.includes("silver") || productTitle.includes("silver");
  const materialLabel = isSilver ? 'Silver-plated' : 'Gold-plated';
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
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
      selectedOptions: selectedVariant.selectedOptions
    });
    toast.success("Added to cart", {
      description: product.title
    });
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }
    setIsBuyingNow(true);
    try {
      const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
        input: { lines: [{ quantity: 1, merchandiseId: selectedVariant.id }] },
      });
      const cart = data?.data?.cartCreate?.cart;
      if (cart?.checkoutUrl) {
        window.open(formatCheckoutUrl(cart.checkoutUrl), '_blank');
      } else {
        toast.error("Failed to create checkout");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsBuyingNow(false);
    }
  };
  return <div className="lg:sticky lg:top-24 space-y-6">
      {/* Title & Favorite */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
          {product.title}
        </h1>
        <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 hover:bg-muted rounded-full transition-colors">
          <Heart className={cn("w-6 h-6 transition-colors", isFavorite ? "fill-primary text-primary" : "text-foreground")} />
        </button>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {hasDiscount && comparePrice && <span className="text-muted-foreground line-through text-sm">
              {formatPrice(comparePrice)}
            </span>}
          <span className="font-display text-2xl text-foreground">
            {formatPrice(price)}
          </span>
          {hasDiscount && comparePrice && <span className="bg-primary text-primary-foreground text-xs px-2 py-1 font-body tracking-wide rounded-lg">
              SAVE {formatPrice(comparePrice - price)}
            </span>}
        </div>
        {hasDiscount && <p className="text-primary text-sm font-body">{discount}% off. No code needed.</p>}
      </div>

      {/* Material Indicator */}
      <div className="flex items-center gap-2">
        <span className={cn("w-4 h-4 rounded-full border", !isSilver ? "bg-amber-400 border-amber-500" : "bg-slate-300 border-slate-400")} />
        <span className="font-body text-sm text-foreground">{materialLabel}</span>
      </div>

      {/* Add to Bag Button */}
      <Button size="lg" className="w-full text-base bg-primary text-primary-foreground border-2 border-primary hover:bg-background hover:text-primary transition-all duration-300" onClick={handleAddToBag} disabled={isLoading || !selectedVariant?.availableForSale}>
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>
            {selectedVariant?.availableForSale ? 'ADD TO BAG' : 'OUT OF STOCK'}
          </span>}
      </Button>

      {/* Buy Now Button */}
      <Button size="lg" variant="outline" className="w-full text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" onClick={handleBuyNow} disabled={isBuyingNow || !selectedVariant?.availableForSale}>
        {isBuyingNow ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="flex items-center gap-2">BUY NOW <ExternalLink className="w-4 h-4" /></span>}
      </Button>

      {/* Collapsible Info */}
      <div className="border-t border-border space-y-0">
        {/* Description Toggle */}
        {product.description && <Collapsible open={openCollapsibles["description"]} onOpenChange={() => toggleCollapsible("description")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full h-14 text-left">
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4" />
                <span className="font-body text-sm">Product Details</span>
              </div>
              {openCollapsibles["description"] ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </CollapsibleContent>
          </Collapsible>}

        <div className="border-t border-border" />

        <Collapsible open={openCollapsibles["returns"]} onOpenChange={() => toggleCollapsible("returns")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full h-14 text-left">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span className="font-body text-sm">Easy 7-Day Returns</span>
            </div>
            {openCollapsibles["returns"] ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">We offer refunds within 7 days of delivery. Items must be unworn and in their original packaging. For additional information visit our returns page.</CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        <Collapsible open={openCollapsibles["shipping"]} onOpenChange={() => toggleCollapsible("shipping")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full h-14 text-left">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4" />
              <span className="font-body text-sm">Free Shipping Available</span>
            </div>
            {openCollapsibles["shipping"] ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            Enjoy free standard shipping on qualifying orders. Express shipping available for an additional fee.
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Pairs With Section */}
      <PairsWithSection currentProductHandle={product.handle} />
    </div>;
};