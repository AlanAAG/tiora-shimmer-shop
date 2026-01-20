import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  collectionBadge?: string;
}

const ProductCard = ({ product, collectionBadge }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const discountPercent = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
  const hasDiscount = discountPercent > 0;
  
  // Use second image for hover if available
  const hoverImage = product.images.length > 1 ? product.images[1] : product.image;

  // Determine material type based on product materials array (default to gold if both available)
  const primaryMaterial = product.materials.includes("gold") ? "gold" : "silver";

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to bag functionality
    console.log("Add to bag:", product.name);
  };

  return (
    <div className="group">
      <Link to={`/product/${product.slug}`}>
        {/* Image container - more vertical aspect ratio */}
        <div 
          className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverImage : product.image}
            alt={product.name}
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

          {/* Add to bag button */}
          <button
            onClick={handleAddToBag}
            className="absolute bottom-3 right-3 w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-foreground hover:text-background transition-all opacity-0 group-hover:opacity-100"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Simplified product info */}
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
    </div>
  );
};

export default ProductCard;
