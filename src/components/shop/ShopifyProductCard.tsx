import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/services/accountService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, loadingVariants } = useCartStore();
  const { user } = useAuth();
  
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

  useEffect(() => {
    if (user) {
      getWishlist(user.id).then(items => {
        setIsWishlisted(items.some(item => item.product_id === node.id));
      }).catch(() => {});
    }
  }, [user, node.id]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
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

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Please log in to save items to your wishlist");
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(user.id, node.id);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(user.id, node.id);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Determine material from variant selectedOptions, fallback to title
  const firstVariant = node.variants.edges[0]?.node;
  const materialOption = firstVariant?.selectedOptions?.find(
    opt => opt.name.toLowerCase() === "jewelry material"
  );
  const materialValue = materialOption?.value?.toLowerCase() || "";
  const titleLower = node.title.toLowerCase();
  const isSilver = materialValue.includes("silver") || titleLower.includes("silver");
  const primaryMaterial = isSilver ? "silver" : "gold";

  // Check if all variants are out of stock
  const isOutOfStock = node.variants.edges.every(v => !v.node.availableForSale);
  const variantId = node.variants.edges[0]?.node?.id;
  const isAddingToCart = variantId ? loadingVariants.has(variantId) : false;

  return (
    <div className="group">
      <Link to={`/product/${node.handle}`}>
        {/* More vertical aspect ratio */}
        <div 
          className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden mb-3 border border-accent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {primaryImage ? (
            <img
              src={isHovered ? hoverImage : primaryImage}
              alt={node.title}
              className={`w-full h-full object-cover transition-all duration-500 ${isOutOfStock ? 'opacity-60 grayscale-[30%]' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {hasDiscount && (
              <span className="bg-primary text-primary-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded-lg font-medium">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Wishlist heart button */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-all"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"}`} />
          </button>
        </div>

        {/* Product info */}
        <div className="space-y-1">
          <h3 className="font-display text-sm text-foreground line-clamp-1">
            {node.title}
          </h3>
          <div className="flex items-center gap-2">
            {hasDiscount && comparePrice && (
              <span className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
            <span className="font-body text-sm font-medium text-foreground">
              {formatPrice(price)}
            </span>
          </div>
          {/* Material indicator */}
          <div className="flex items-center gap-2 pt-1">
            <span 
              className={`w-3 h-3 rounded-full border border-border ${
                primaryMaterial === "gold" 
                  ? "bg-amber-400" 
                  : "bg-gray-300"
              }`}
            />
            <span className="font-body text-xs text-muted-foreground">
              {primaryMaterial === "gold" ? "Gold Plated" : "Silver Plated"}
            </span>
          </div>
        </div>
      </Link>

      {/* ADD+ button below card */}
      {isOutOfStock ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs h-8 rounded-xl mt-2 opacity-50 cursor-not-allowed border-muted-foreground/30 text-muted-foreground"
          disabled
        >
          Out of Stock
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs h-8 rounded-xl mt-2"
          onClick={handleAddToBag}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ShopifyProductCard;
