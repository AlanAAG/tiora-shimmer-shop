import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getWishlist, removeFromWishlist } from "@/services/accountService";
import { WishlistItem } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { allProducts } from "@/data/products";

export const AccountWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const data = await getWishlist(user.id);
          setWishlist(data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemove = async (productId: string) => {
    if (!user) return;
    
    try {
      await removeFromWishlist(user.id, productId);
      setWishlist((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // TODO: Replace with real Shopify product data
  const getProductDetails = (productId: string) => {
    // Try to find in mock products first
    const product = allProducts.find((p) => String(p.id) === productId || p.slug === productId);
    if (product) {
      return {
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
      };
    }
    // Fallback for Shopify product IDs
    return {
      name: `Product ${productId.slice(0, 8)}`,
      price: 0,
      image: "/placeholder.svg",
    };
  };

  // TODO: Integrate with cart store
  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
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
          const product = getProductDetails(item.product_id);
          return (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl overflow-hidden group"
            >
              <div className="aspect-square bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-primary font-medium mt-1">
                  {product.price > 0 ? `₹${product.price.toLocaleString()}` : "Price unavailable"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => handleAddToCart(item.product_id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
