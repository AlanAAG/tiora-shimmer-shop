import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getWishlist, removeFromWishlist } from "@/services/accountService";
import { WishlistItem } from "@/lib/supabase";
import { storefrontApiRequest, ShopifyProduct, createCart, formatCheckoutUrl } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingCart, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const WISHLIST_PRODUCTS_QUERY = `
  query GetNodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 2) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        options {
          name
          values
        }
      }
    }
  }
`;

interface ShopifyNodeProduct {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

export const AccountWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Map<string, ShopifyNodeProduct>>(new Map());
  const [loading, setLoading] = useState(true);
  const { addItem, loadingVariants } = useCartStore();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const data = await getWishlist(user.id);
        setWishlist(data);

        // Fetch Shopify product data for all wishlisted items
        const shopifyIds = data
          .map((item) => item.product_id)
          .filter((id) => id.startsWith("gid://"));

        if (shopifyIds.length > 0) {
          const result = await storefrontApiRequest(WISHLIST_PRODUCTS_QUERY, {
            ids: shopifyIds,
          });

          if (result?.data?.nodes) {
            const productMap = new Map<string, ShopifyNodeProduct>();
            result.data.nodes.forEach((node: ShopifyNodeProduct | null) => {
              if (node?.id) {
                productMap.set(node.id, node);
              }
            });
            setProducts(productMap);
          }
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemove = async (productId: string) => {
    if (!user) return;
    try {
      await removeFromWishlist(user.id, productId);
      setWishlist((prev) => prev.filter((item) => item.product_id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (productId: string) => {
    const product = products.get(productId);
    if (!product) return;

    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("This product is unavailable");
      return;
    }
    if (!firstVariant.availableForSale) {
      toast.error("This product is currently sold out");
      return;
    }

    // Convert to ShopifyProduct format for cart store
    const shopifyProduct: ShopifyProduct = {
      node: {
        ...product,
        description: "",
        tags: [],
        productType: "",
      } as ShopifyProduct["node"],
    };

    await addItem({
      product: shopifyProduct,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Wishlist</h2>
        <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl aspect-square" />
          ))}
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Wishlist</h2>
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Save your favorite pieces here for later
          </p>
          <Button asChild>
            <a href="/shop">Explore Collections</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display">My Wishlist</h2>
        <p className="text-sm text-muted-foreground">{wishlist.length} items</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => {
          const product = products.get(item.product_id);
          const primaryImage = product?.images.edges[0]?.node;
          const secondImage = product?.images.edges[1]?.node;
          const hoverImageUrl = secondImage?.url || primaryImage?.url;
          const price = product?.priceRange.minVariantPrice;
          const compareAtPrice = product?.compareAtPriceRange?.minVariantPrice;
          const firstVariant = product?.variants.edges[0]?.node;
          const isAdding = firstVariant ? loadingVariants.has(firstVariant.id) : false;

          return (
            <WishlistCard
              key={item.id}
              item={item}
              product={product}
              primaryImageUrl={primaryImage?.url}
              hoverImageUrl={hoverImageUrl}
              imageAlt={primaryImage?.altText || product?.title || "Product"}
              price={price}
              compareAtPrice={compareAtPrice}
              firstVariant={firstVariant}
              isAdding={isAdding}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

// Separate component so each card has its own hover state
function WishlistCard({
  item,
  product,
  primaryImageUrl,
  hoverImageUrl,
  imageAlt,
  price,
  compareAtPrice,
  firstVariant,
  isAdding,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItem;
  product: ShopifyNodeProduct | undefined;
  primaryImageUrl: string | undefined;
  hoverImageUrl: string | undefined;
  imageAlt: string;
  price: { amount: string; currencyCode: string } | undefined;
  compareAtPrice: { amount: string; currencyCode: string } | undefined;
  firstVariant: { id: string; availableForSale: boolean } | undefined;
  isAdding: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const hasDiscount = compareAtPrice && price && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(price!.amount) / parseFloat(compareAtPrice!.amount)) * 100)
    : 0;

  const formatPrice = (p: { amount: string }) => `₹${parseFloat(p.amount).toLocaleString()}`;

  const handleBuyNow = async () => {
    if (!firstVariant?.availableForSale) return;
    setIsBuyingNow(true);
    try {
      const result = await createCart(firstVariant.id, 1);
      const checkoutUrl = result?.cart?.checkoutUrl;
      if (checkoutUrl) {
        window.open(formatCheckoutUrl(checkoutUrl), '_blank');
      } else {
        toast.error("Failed to create checkout");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden group">
      <Link
        to={product?.handle ? `/product/${product.handle}` : "#"}
        className="block aspect-[3/4] bg-muted relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? (hoverImageUrl || "/placeholder.svg") : (primaryImageUrl || "/placeholder.svg")}
          alt={imageAlt}
          className="w-full h-full object-cover transition-all duration-500"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded-lg font-medium">
            {discountPercent}% OFF
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.product_id);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </Link>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">
          {product?.title || "Loading..."}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount && compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
          <span className="text-sm font-medium text-foreground">
            {price ? formatPrice(price) : "—"}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-xs h-8 rounded-xl"
          onClick={() => onAddToCart(item.product_id)}
          disabled={isAdding || !firstVariant?.availableForSale}
        >
          {isAdding ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : (
            <ShoppingCart className="w-3 h-3 mr-1" />
          )}
          {!firstVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
        </Button>
        {firstVariant?.availableForSale && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 text-xs h-8 rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={handleBuyNow}
            disabled={isBuyingNow}
          >
            {isBuyingNow ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <ExternalLink className="w-3 h-3 mr-1" />
            )}
            Buy Now
          </Button>
        )}
      </div>
    </div>
  );
}
