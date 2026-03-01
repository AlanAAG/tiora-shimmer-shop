import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getWishlist, removeFromWishlist } from "@/services/accountService";
import { WishlistItem } from "@/lib/supabase";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingCart, Loader2 } from "lucide-react";
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
  firstVariant: { id: string; availableForSale: boolean } | undefined;
  isAdding: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

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
        <p className="text-primary font-medium mt-1">
          {price ? `₹${parseFloat(price.amount).toLocaleString()}` : "—"}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3"
          onClick={() => onAddToCart(item.product_id)}
          disabled={isAdding || !firstVariant?.availableForSale}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <ShoppingCart className="w-4 h-4 mr-2" />
          )}
          {!firstVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
