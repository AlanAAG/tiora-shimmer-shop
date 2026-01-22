import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isLoading } = useCartStore();

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;

  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  const primaryImage = node.images.edges[0]?.node.url;
  const hoverImage = node.images.edges[1]?.node.url || primaryImage;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleAddToBag = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: node.title,
    });
  };

  // Determine material from title
  const titleLower = node.title.toLowerCase();
  const hasSilver = titleLower.includes("silver");
  const primaryMaterial = hasSilver ? "silver" : "gold";

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group flex-shrink-0"
      style={{ width: "calc(23vw - 1rem)", maxWidth: "220px", minWidth: "160px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-xl border border-accent">
        {primaryImage ? (
          <img
            src={isHovered ? hoverImage : primaryImage}
            alt={node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-row gap-1.5">
          {hasDiscount && (
            <span className="bg-primary text-primary-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded-lg font-medium">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToBag}
          disabled={isLoading}
          className="absolute bottom-2 right-2 w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground hover:text-background disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>

      {/* Product Info */}
      <div className="pt-2 space-y-1">
        <h3 className="font-display text-sm text-foreground line-clamp-1">{node.title}</h3>
        <div className="flex items-center gap-2">
          {hasDiscount && comparePrice && (
            <span className="font-body text-xs text-muted-foreground line-through">{formatPrice(comparePrice)}</span>
          )}
          <span className="font-body text-sm font-medium text-foreground">{formatPrice(price)}</span>
        </div>
        {/* Material indicator */}
        <div className="flex items-center gap-2 pt-1">
          <span
            className={`w-3 h-3 rounded-full border border-border ${
              primaryMaterial === "gold" ? "bg-amber-400" : "bg-gray-300"
            }`}
          />
          <span className="font-body text-xs text-muted-foreground">
            {primaryMaterial === "gold" ? "Gold Plated" : "Silver Plated"}
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProductSkeleton = () => (
  <div className="flex-shrink-0" style={{ width: "calc(23vw - 1rem)", maxWidth: "220px", minWidth: "160px" }}>
    <Skeleton className="aspect-[3/4] rounded-xl" />
    <div className="pt-2 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

const MostPopular = () => {
  const { data: products, isLoading, error } = useShopifyCollection("Best Sellers", 9);

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-3">Most Popular</h2>
          <p className="font-body text-muted-foreground">Elevate your style with our latest designs.</p>
        </div>

        {/* Scrollable Products */}
        <div className="overflow-x-auto scrollbar-hide mb-6">
          <div className="flex gap-3 min-w-max pl-4 md:pl-0" style={{ width: "max-content" }}>
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : error || !products || products.length === 0 ? (
              <div className="flex items-center justify-center w-full py-12 text-muted-foreground">
                No products found
              </div>
            ) : (
              products.map((product) => <ProductCard key={product.node.id} product={product} />)
            )}
          </div>
        </div>

        {/* Shop Collection Button */}
        <Button
          variant="outline"
          className="w-full max-w-xl mx-auto flex uppercase tracking-widest text-xs h-14 rounded-2xl mb-8"
          asChild
        >
          <Link to="/shop?collection=best-sellers">View More</Link>
        </Button>
      </div>
    </section>
  );
};

export default MostPopular;
