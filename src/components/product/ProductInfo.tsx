import { useState } from "react";
import { Heart, Star, ArrowRight, RotateCcw, Truck, Plus, Minus, Loader2, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Review, formatPrice as formatPriceMock, allProducts } from "@/data/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ShopifyProduct, createCart, formatCheckoutUrl } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { PairsWithSection } from "./PairsWithSection";

interface ProductInfoProps {
  product: Product | ShopifyProduct['node'];
  reviews?: Review[];
}

export const ProductInfo = ({ product, reviews = [] }: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});

  // Determine if Shopify product
  const isShopify = 'variants' in product;

  // Shopify State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addItem, isLoading: isCartLoading } = useCartStore();

  // Mock State
  const [selectedMaterial, setSelectedMaterial] = useState<"gold" | "silver">("gold");

  const toggleCollapsible = (key: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

      {/* Material Selection */}
      <div className="space-y-3">
        <p className="font-body text-sm text-foreground">Material</p>
        <div className="flex items-center gap-4">
          {/* Gold Option */}
          <button
            onClick={() => handleMaterialSelect("gold")}
            className={cn(
              "flex items-center gap-2 py-2 px-4 border rounded-xl transition-all",
              !isSilver
                ? "bg-muted border-foreground"
                : "border-border hover:border-foreground/50"
            )}
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500" />
            <span className="font-body text-sm">18k Gold Plated</span>
          </button>

          {/* Silver Option */}
          <button
            onClick={() => handleMaterialSelect("silver")}
            className={cn(
              "flex items-center gap-2 py-2 px-4 border rounded-xl transition-all",
              isSilver
                ? "bg-muted border-foreground"
                : "border-border hover:border-foreground/50"
            )}
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400" />
            <span className="font-body text-sm">Silver Plated</span>
          </button>
        </div>
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

      {/* Collapsibles */}
       <div className="border-t border-border pt-4 space-y-0">
        <Collapsible open={openCollapsibles["description"]} onOpenChange={() => toggleCollapsible("description")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left">
             <div className="flex items-center gap-3">
                <Info className="w-4 h-4" />
                <span className="font-body text-sm">Product Description</span>
             </div>
            {openCollapsibles["description"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            {isShopify ? shopifyProduct!.description : mockProduct!.description}
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

        <Collapsible open={openCollapsibles["returns"]} onOpenChange={() => toggleCollapsible("returns")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span className="font-body text-sm">Easy Returns</span>
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
              <span className="font-body text-sm">Free Shipping</span>
            </div>
            {openCollapsibles["shipping"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            Enjoy free standard shipping on all orders. Express shipping available for an additional fee.
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Pairs With */}
      {isShopify ? (
          <PairsWithSection currentProductHandle={shopifyProduct!.handle} />
      ) : (
        /* Original mock Pairs With implementation */
        <div className="border-t border-border pt-6">
        <h3 className="font-display text-xl text-foreground mb-4">Pairs With</h3>
        <div className="space-y-3">
             {allProducts
            .filter(p => p.category !== mockProduct!.category && p.id !== mockProduct!.id)
            .slice(0, 2).map((pairProduct) => (
            <Link
              key={pairProduct.id}
              to={`/product/${pairProduct.slug}`}
              className="flex items-center gap-3 p-3 border border-border hover:border-foreground/50 transition-colors rounded-2xl"
            >
              <div className="w-16 h-16 bg-muted overflow-hidden flex-shrink-0 rounded-xl">
                <img
                  src={pairProduct.image}
                  alt={pairProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-sm text-foreground truncate">{pairProduct.name}</h4>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-muted-foreground line-through text-[10px]">
                    {formatPriceMock(pairProduct.comparePrice)}
                  </span>
                  <span className="font-body text-xs text-foreground">
                    {formatPriceMock(pairProduct.price)}
                  </span>
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                    {Math.round(((pairProduct.comparePrice - pairProduct.price) / pairProduct.comparePrice) * 100)}% OFF
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex-shrink-0 text-[10px] px-2 h-7">
                ADD
              </Button>
            </Link>
          ))}
        </div>
      </div>
      )}

      {/* Drawer Links */}
      <div className="space-y-3 pt-2">
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
                <li>18K gold plated brass or sterling silver</li>
                <li>Hypoallergenic and nickel-free</li>
                <li>Handcrafted with care</li>
                <li>One size fits most</li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 text-sm font-body underline hover:text-primary transition-colors">
              Care & Cleaning
              <ArrowRight className="w-4 h-4" />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Care & Cleaning</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>To keep your jewelry looking its best:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Store in a cool, dry place</li>
                <li>Avoid contact with water, perfume, and lotions</li>
                <li>Clean gently with a soft, dry cloth</li>
                <li>Remove before swimming or showering</li>
                <li>Store separately to prevent scratching</li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  );
};
