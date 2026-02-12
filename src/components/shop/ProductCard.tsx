import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/services/accountService";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  collectionBadge?: string;
}

const ProductCard = ({ product, collectionBadge }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAuth();
  
  const discountPercent = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
  const hasDiscount = discountPercent > 0;
  
  const hoverImage = product.images.length > 1 ? product.images[1] : product.image;
  const primaryMaterial = product.materials.includes("gold") ? "gold" : "silver";

  const productIdStr = String(product.id);

  useEffect(() => {
    if (user) {
      getWishlist(user.id).then(items => {
        setIsWishlisted(items.some(item => item.product_id === productIdStr));
      }).catch(() => {});
    }
  }, [user, productIdStr]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Please log in to save items to your wishlist");
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(user.id, productIdStr).then(() => {
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      }).catch(() => toast.error("Something went wrong"));
    } else {
      addToWishlist(user.id, productIdStr).then(() => {
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }).catch(() => toast.error("Something went wrong"));
    }
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to bag:", product.name);
  };

  return (
    <div className="group">
      <Link to={`/product/${product.slug}`}>
        <div 
          className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-3 border border-accent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverImage : product.image}
            alt={`Waterproof 18k gold-plated ${product.name} - Tiora`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {collectionBadge && (
              <span className="bg-muted/90 backdrop-blur-sm text-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded font-medium">
                {collectionBadge}
              </span>
            )}
            {hasDiscount && (
              <span className="bg-primary text-primary-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded font-medium">
                {discountPercent}% OFF
              </span>
            )}
            {product.isNew && !collectionBadge && (
              <span className="bg-muted/90 backdrop-blur-sm text-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded font-medium">
                NEW
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

        <div className="space-y-1">
          <h3 className="font-display text-sm text-foreground line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
            <span className="font-body text-sm font-medium text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
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

      {/* ADD+ button below card */}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs h-8 rounded-xl mt-2"
        onClick={handleAddToBag}
      >
        ADD+
      </Button>
    </div>
  );
};

export default ProductCard;
