import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/services/accountService";
import { toast } from "sonner";
import productRing from "@/assets/product-ring.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const products = [
  { id: "1", name: "Wave Sculpt Ring", price: 4500, image: productRing, isNew: true },
  { id: "2", name: "Cascade Earrings", price: 5800, image: productEarrings, isNew: true },
  { id: "3", name: "Fluid Link Bracelet", price: 7200, image: productBracelet, isNew: false },
  { id: "4", name: "Liquid Flow Necklace", price: 9500, image: productNecklace, isNew: false },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const FeaturedProducts = () => {
  const { user } = useAuth();
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      getWishlist(user.id).then(items => {
        setWishlistedIds(new Set(items.map(item => item.product_id)));
      }).catch(() => {});
    }
  }, [user]);

  const handleWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Please log in to save items to your wishlist");
      return;
    }
    try {
      if (wishlistedIds.has(productId)) {
        await removeFromWishlist(user.id, productId);
        setWishlistedIds(prev => { const next = new Set(prev); next.delete(productId); return next; });
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(user.id, productId);
        setWishlistedIds(prev => new Set(prev).add(productId));
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated for You
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Featured Pieces
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to="/shop">
                {/* Image Container */}
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">
                      New
                    </span>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                  {/* Wishlist heart button */}
                  <button
                    onClick={(e) => handleWishlist(e, product.id)}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background transition-all"
                  >
                    <Heart className={`w-4 h-4 ${wishlistedIds.has(product.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>

              {/* ADD+ button below card */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs h-8 rounded-xl mt-2"
              >
                ADD+
              </Button>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
