import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
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

  return (
    <div className="group">
      <Link to={`/product/${node.handle}`}>
        <div 
          className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {primaryImage ? (
            <img
              src={isHovered ? hoverImage : primaryImage}
              alt={node.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {hasDiscount && (
              <span className="bg-primary text-primary-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded font-medium">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Add to bag button */}
          <button
            onClick={handleAddToBag}
            disabled={isLoading}
            className="absolute bottom-3 right-3 w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-foreground hover:text-background transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="font-display text-sm text-foreground line-clamp-1">
            {node.title}
          </h3>
          <p className="font-body text-xs text-muted-foreground line-clamp-1">
            {node.description?.slice(0, 40) || 'No description'}...
          </p>
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
          {hasDiscount && (
            <p className="font-body text-xs text-primary">
              with {discountPercent}% off auto-applied
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ShopifyProductCard;
