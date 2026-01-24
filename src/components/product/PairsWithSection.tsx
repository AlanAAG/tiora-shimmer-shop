import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PairsWithSectionProps {
  currentProductHandle: string;
}

export const PairsWithSection = ({ currentProductHandle }: PairsWithSectionProps) => {
  const { data: products, isLoading } = useShopifyCollection('best-sellers', 10);
  const { addItem, isLoading: isAddingToCart } = useCartStore();

  // Filter out current product and get 2 different products
  const pairsWithProducts = products
    ?.filter(p => p.node.handle !== currentProductHandle)
    .slice(0, 2) || [];

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const handleAddToBag = async (product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("No variant available");
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
      description: product.node.title,
    });
  };

  if (isLoading) {
    return (
      <div className="pt-6">
        <h3 className="font-display text-lg mb-4">Pairs with</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (pairsWithProducts.length === 0) {
    return null;
  }

  return (
    <div className="pt-6 border-t border-border">
      <h3 className="font-display text-lg mb-4">Pairs with</h3>
      <div className="space-y-3">
        {pairsWithProducts.map((product) => {
          const firstVariant = product.node.variants.edges[0]?.node;
          const price = firstVariant?.price;
          const image = product.node.images.edges[0]?.node;

          return (
            <div 
              key={product.node.id} 
              className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-border"
            >
              {/* Product Image */}
              <Link 
                to={`/product/${product.node.handle}`}
                className="shrink-0 w-32 h-32 bg-muted rounded-xl overflow-hidden"
              >
                {image && (
                  <img
                    src={image.url}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.node.handle}`}>
                  <h4 className="font-display text-base font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                    {product.node.title}
                  </h4>
                </Link>
                {price && (
                  <p className="font-body text-base font-bold text-foreground mt-1">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs h-9 px-5 rounded-xl"
                  onClick={() => handleAddToBag(product)}
                  disabled={isAddingToCart || !firstVariant?.availableForSale}
                >
                  ADD TO BAG
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
