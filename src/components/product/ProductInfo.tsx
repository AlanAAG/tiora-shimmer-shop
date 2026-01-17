import { useState } from "react";
import { Heart, Star, ArrowRight, RotateCcw, Truck, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Review, formatPrice, allProducts } from "@/data/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductInfoProps {
  product: Product;
  reviews: Review[];
}

export const ProductInfo = ({ product, reviews }: ProductInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [stackType, setStackType] = useState<"single" | "bundle">("single");
  const [selectedMaterial, setSelectedMaterial] = useState<"gold" | "silver">("gold");
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});

  const toggleCollapsible = (key: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const discount = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);

  const pairsWithProducts = allProducts
    .filter(p => p.category !== product.category && p.id !== product.id)
    .slice(0, 2);

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
          {product.name}
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

      {/* Star Reviews */}
      <button onClick={scrollToReviews} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : i < product.rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground underline">({product.reviewCount})</span>
      </button>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground line-through text-sm">
            {formatPrice(product.comparePrice)}
          </span>
          <span className="font-display text-2xl text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 font-body tracking-wide">
            SAVE {formatPrice(product.comparePrice - product.price)}
          </span>
        </div>
        <p className="text-red-500 text-sm font-body">{discount}% off sitewide. No code needed.</p>
      </div>

      {/* Pick Your Stack */}
      <div className="space-y-3">
        <p className="font-body text-sm text-foreground">Pick Your Stack</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setStackType("single")}
            className={cn(
              "py-3 px-4 border text-sm font-body transition-all",
              stackType === "single"
                ? "bg-muted border-foreground"
                : "border-border hover:border-foreground/50"
            )}
          >
            Single Piece
          </button>
          <button
            onClick={() => setStackType("bundle")}
            className={cn(
              "py-3 px-4 border text-sm font-body transition-all",
              stackType === "bundle"
                ? "bg-muted border-foreground"
                : "border-border hover:border-foreground/50"
            )}
          >
            Bundle
          </button>
        </div>

        {/* Bundle Options */}
        {stackType === "bundle" && (
          <div className="grid grid-cols-3 gap-3 pt-2 animate-fade-in">
            {product.bundles.map((bundle) => (
              <button
                key={bundle.id}
                onClick={() => setSelectedBundle(bundle.id)}
                className={cn(
                  "border rounded-lg overflow-hidden transition-all",
                  selectedBundle === bundle.id
                    ? "border-foreground ring-1 ring-foreground"
                    : "border-border hover:border-foreground/50"
                )}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="p-2 text-xs font-body text-center leading-tight">{bundle.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Material Selection */}
      <div className="space-y-3">
        <p className="font-body text-sm text-foreground">
          Material: <span className="font-medium">{selectedMaterial === "gold" ? "18k Gold Plated" : "Sterling Silver"}</span>
        </p>
        <div className="flex items-center gap-3">
          {product.materials.includes("gold") && (
            <button
              onClick={() => setSelectedMaterial("gold")}
              className={cn(
                "w-8 h-8 rounded-full transition-all relative",
                "bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500",
                selectedMaterial === "gold" && "ring-2 ring-offset-2 ring-foreground"
              )}
            />
          )}
          {product.materials.includes("silver") && (
            <button
              onClick={() => setSelectedMaterial("silver")}
              className={cn(
                "w-8 h-8 rounded-full transition-all relative",
                "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400",
                selectedMaterial === "silver" && "ring-2 ring-offset-2 ring-foreground"
              )}
            />
          )}
        </div>
      </div>

      {/* Add to Bag Button */}
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full text-base relative overflow-hidden group"
      >
        <span className="relative z-10">ADD TO BAG</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-button-shine" />
      </Button>

      {/* Collapsible Info */}
      <div className="border-t border-border pt-4 space-y-0">
        <Collapsible open={openCollapsibles["description"]} onOpenChange={() => toggleCollapsible("description")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left">
            <span className="font-body text-sm">Product Description</span>
            {openCollapsibles["description"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t border-border" />

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
              <span className="font-body text-sm">Free Shipping on Orders Above ₹3,000</span>
            </div>
            {openCollapsibles["shipping"] ? (
              <Minus className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
            Enjoy free standard shipping on all orders over ₹3,000. Express shipping available for an additional fee.
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Pairs With Section */}
      <div className="border-t border-border pt-6">
        <h3 className="font-display text-xl text-foreground mb-4">Pairs With</h3>
        <div className="space-y-3">
          {pairsWithProducts.map((pairProduct) => (
            <Link
              key={pairProduct.id}
              to={`/product/${pairProduct.slug}`}
              className="flex items-center gap-4 p-3 border border-border hover:border-foreground/50 transition-colors"
            >
              <div className="w-20 h-20 bg-muted overflow-hidden flex-shrink-0">
                <img
                  src={pairProduct.image}
                  alt={pairProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base text-foreground">{pairProduct.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground line-through text-xs">
                    {formatPrice(pairProduct.comparePrice)}
                  </span>
                  <span className="font-body text-sm text-foreground">
                    {formatPrice(pairProduct.price)}
                  </span>
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                    {Math.round(((pairProduct.comparePrice - pairProduct.price) / pairProduct.comparePrice) * 100)}% OFF
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                ADD TO BAG
              </Button>
            </Link>
          ))}
        </div>
      </div>

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
              <p>{product.description}</p>
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
