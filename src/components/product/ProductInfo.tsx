import { useState } from "react";
import { Heart, Star, ArrowRight, RotateCcw, Truck, Plus, Minus, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Review, formatPrice as formatPriceMock, allProducts } from "@/data/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ShopifyProduct, createCart, formatCheckoutUrl } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";


interface ProductInfoProps {
  product: Product | ShopifyProduct['node'];
  reviews?: Review[];
}

export const ProductInfo = ({ product, reviews = [] }: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  

  // Determine if Shopify product
  const isShopify = 'variants' in product;

  // Shopify State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addItem, isLoading: isCartLoading } = useCartStore();

  // Mock State
  const [selectedMaterial, setSelectedMaterial] = useState<"gold" | "silver">("gold");


  // Shopify Data Helpers
  const shopifyProduct = isShopify ? (product as ShopifyProduct['node']) : null;
  const mockProduct = !isShopify ? (product as Product) : null;

  const variants = shopifyProduct?.variants.edges.map(edge => edge.node) || [];
  const selectedVariant = variants[selectedVariantIndex];

  // Price Logic
  const priceAmount = isShopify
    ? parseFloat(selectedVariant?.price.amount || '0')
    : mockProduct?.price || 0;

  const comparePriceAmount = isShopify
    ? (selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null)
    : mockProduct?.comparePrice;

  const currencyCode = isShopify ? (selectedVariant?.price.currencyCode || 'INR') : 'INR';

  const hasDiscount = comparePriceAmount && comparePriceAmount > priceAmount;
  const discountPercentage = hasDiscount
    ? Math.round(((comparePriceAmount! - priceAmount) / comparePriceAmount!) * 100)
    : 0;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Material Logic (Shopify)
  // Check if "Jewelry Material" option exists
  const materialOptionIndex = shopifyProduct?.options.findIndex(opt => opt.name.toLowerCase() === "jewelry material");
  const materialOptions = materialOptionIndex !== undefined && materialOptionIndex !== -1
    ? shopifyProduct?.options[materialOptionIndex].values
    : [];

  // Find current selected material
  const currentMaterial = selectedVariant?.selectedOptions?.find(opt => opt.name.toLowerCase() === "jewelry material")?.value;

  const handleMaterialSelect = (value: string) => {
    if (!isShopify) {
      setSelectedMaterial(value as "gold" | "silver");
      return;
    }
    // Find variant with this material option
    // This is simple if only material varies. If size varies too, it's more complex.
    // Assuming simple variant selection for now based on material if it's the main option.
    const newVariantIndex = variants.findIndex(v =>
      v.selectedOptions.some(opt => opt.name.toLowerCase() === "jewelry material" && opt.value.toLowerCase().includes(value.toLowerCase()))
    );
    if (newVariantIndex !== -1) {
      setSelectedVariantIndex(newVariantIndex);
    } else {
        // Fallback: Just pick first one if matching fails, or do nothing.
    }
  };

  const isSilver = isShopify
    ? (currentMaterial?.toLowerCase().includes("silver") || shopifyProduct?.title.toLowerCase().includes("silver"))
    : selectedMaterial === "silver";

  const handleAddToBag = async () => {
    if (!isShopify) {
      toast.success("Added to bag (Mock)");
      return;
    }

    if (!selectedVariant) {
        toast.error("Please select a variant");
        return;
    }

    if (!selectedVariant.availableForSale) {
        toast.error("Product is out of stock");
        return;
    }

    const shopifyProductWrapper: ShopifyProduct = {
      node: shopifyProduct!
    };

    await addItem({
      product: shopifyProductWrapper,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    });

    toast.success("Added to cart", {
      description: shopifyProduct!.title
    });
  };

  const handleBuyNow = async () => {
    if (!isShopify) {
      toast.info("Buy Now not available for mock products");
      return;
    }

    if (!selectedVariant) {
        toast.error("Please select a variant");
        return;
    }

    if (!selectedVariant.availableForSale) {
        toast.error("Product is out of stock");
        return;
    }

    try {
        // Direct Checkout Creation via API as requested
        const cartCreate = await createCart(selectedVariant.id, 1);

        if (cartCreate?.userErrors?.length > 0) {
            console.error(cartCreate.userErrors);
            toast.error("Failed to initiate checkout");
            return;
        }

        const checkoutUrl = cartCreate?.cart?.checkoutUrl;
        if (checkoutUrl) {
            window.location.href = formatCheckoutUrl(checkoutUrl);
        } else {
             toast.error("Failed to get checkout URL");
        }

    } catch (error) {
        console.error("Buy Now Error:", error);
        toast.error("An error occurred. Please try again.");
    }
  };

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
       {/* Title & Favorite */}
       <div className="flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
          {isShopify ? shopifyProduct!.title : mockProduct!.name}
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

      {/* Description */}
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {isShopify ? shopifyProduct!.description : mockProduct!.description}
      </p>

      {/* Reviews (Mock Only or If passed) */}
      {!isShopify && (
      <button onClick={scrollToReviews} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.floor(mockProduct!.rating)
                  ? "fill-amber-400 text-amber-400"
                  : i < mockProduct!.rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground underline">({mockProduct!.reviewCount})</span>
      </button>
      )}

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
           {hasDiscount && (
             <span className="text-muted-foreground line-through text-sm">
                {formatPrice(comparePriceAmount!)}
             </span>
           )}
          <span className="font-display text-2xl text-foreground">
            {formatPrice(priceAmount)}
          </span>
           {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 font-body tracking-wide rounded-lg">
              SAVE {formatPrice(comparePriceAmount! - priceAmount)}
            </span>
           )}
        </div>
        {hasDiscount && (
            <p className="text-red-500 text-sm font-body">{discountPercentage}% off sitewide. No code needed.</p>
        )}
      </div>

      {/* Material Indicator */}
      <div className="space-y-3">
        <p className="font-body text-sm text-foreground">Material</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 py-2 px-4 border rounded-xl bg-muted border-foreground">
            {isSilver ? (
              <>
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400" />
                <span className="font-body text-sm">Silver Plated</span>
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500" />
                <span className="font-body text-sm">18k Gold Plated</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Link */}
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 text-sm font-body underline hover:text-primary transition-colors">
              Product Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Product Details</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>{isShopify ? shopifyProduct!.description : mockProduct!.description}</p>
              <ul className="list-disc pl-5 space-y-2">
                {isSilver ? (
                  <>
                    <li>Premium 925 silver-plated finish</li>
                    <li>Stainless Steel core</li>
                    <li>Anti-Tarnish protection</li>
                    {(isShopify ? shopifyProduct!.productType?.toLowerCase().includes("ring") || shopifyProduct!.title.toLowerCase().includes("ring") : mockProduct!.name?.toLowerCase().includes("ring")) && (
                      <li>Open, adjustable fit</li>
                    )}
                    <li>Lightweight and comfortable</li>
                    <li>Hypoallergenic & skin-safe</li>
                    <li>Water resistant</li>
                  </>
                ) : (
                  <>
                    <li>Premium 18k gold-plated plating</li>
                    <li>Stainless Steel core</li>
                    <li>Anti-Tarnish protection</li>
                    {(isShopify ? shopifyProduct!.productType?.toLowerCase().includes("ring") || shopifyProduct!.title.toLowerCase().includes("ring") : mockProduct!.name?.toLowerCase().includes("ring")) && (
                      <li>Open, adjustable fit</li>
                    )}
                    <li>Lightweight and comfortable</li>
                    <li>Hypoallergenic & skin-safe</li>
                    <li>Water resistant</li>
                  </>
                )}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Buttons */}
       <div className="space-y-3 pt-4">
        {/* Add to Bag */}
        <Button
            size="lg"
            className="w-full text-base relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToBag}
            disabled={isCartLoading || (isShopify && !selectedVariant?.availableForSale)}
        >
            {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <span className="relative z-10 font-body font-medium tracking-wide">
                    {isShopify && !selectedVariant?.availableForSale ? 'OUT OF STOCK' : 'ADD TO BAG'}
                </span>
            )}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>

        {/* Buy Now */}
        <Button
            size="lg"
            variant="outline"
            className="w-full text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={handleBuyNow}
            disabled={isShopify && !selectedVariant?.availableForSale}
        >
            <span className="flex items-center gap-2">BUY NOW <ExternalLink className="w-4 h-4" /></span>
        </Button>
      </div>

      {/* Returns & Shipping Highlights */}
      <div className="border-t border-border pt-5 space-y-3">
        <div className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-body text-sm font-semibold text-foreground">7-Day Easy Returns</span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hassle-free returns within 7 days of delivery.{" "}
              <Link to="/refund" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                Learn more
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="font-body text-sm font-semibold text-foreground">Free Shipping — Pan India</span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complimentary shipping on every order, anywhere in India.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};
