import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionHero from "@/components/shop/CollectionHero";
import CollectionFilter from "@/components/shop/CollectionFilter";
import ProductCard from "@/components/shop/ProductCard";
import ShopifyProductCard from "@/components/shop/ShopifyProductCard";
import SaleBanner from "@/components/shop/SaleBanner";
import ShopTrustSection from "@/components/shop/ShopTrustSection";
import { allProducts, Product } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2, Package } from "lucide-react";

type CollectionType = "all" | "best-sellers" | "rings" | "earrings" | "bracelets" | "necklaces";

const collectionConfig: Record<CollectionType, { name: string; filter: (p: Product) => boolean }> = {
  "all": { 
    name: "All Items", 
    filter: () => true 
  },
  "best-sellers": { 
    name: "Best Sellers", 
    filter: (p) => p.isBestSeller 
  },
  "rings": { 
    name: "Rings", 
    filter: (p) => p.category === "rings" 
  },
  "earrings": { 
    name: "Earrings", 
    filter: (p) => p.category === "earrings" 
  },
  "bracelets": { 
    name: "Bracelets", 
    filter: (p) => p.category === "bracelets" 
  },
  "necklaces": { 
    name: "Necklaces", 
    filter: (p) => p.category === "necklaces" 
  },
};

const Shop = () => {
  const [searchParams] = useSearchParams();

  // Get collection from URL or default to "all"
  const collectionParam = searchParams.get("collection") as CollectionType || "all";
  const collection = collectionConfig[collectionParam] ? collectionParam : "all";
  
  const collectionName = collectionConfig[collection].name;
  const mockProducts = allProducts.filter(collectionConfig[collection].filter);

  // Fetch Shopify products
  const { data: shopifyProducts, isLoading, error } = useShopifyProducts(50);

  // Get badge text for products
  const getBadgeText = () => {
    if (collection === "best-sellers") return "Best Seller";
    if (collection === "rings") return "Rings";
    if (collection === "earrings") return "Earrings";
    if (collection === "bracelets") return "Bracelets";
    if (collection === "necklaces") return "Necklaces";
    return undefined;
  };

  // Scroll to top on collection change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collection]);

  const hasShopifyProducts = shopifyProducts && shopifyProducts.length > 0;
  const totalProductCount = hasShopifyProducts 
    ? shopifyProducts.length 
    : mockProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Collection Hero */}
      <CollectionHero 
        collectionName={collectionName} 
        collectionSlug={collection} 
      />

      {/* Filter Section */}
      <CollectionFilter productCount={totalProductCount} />

      {/* Product Grid */}
      <section className="px-4 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : hasShopifyProducts ? (
          // Shopify Products
          <div className="grid grid-cols-2 gap-4">
            <SaleBanner />
            {shopifyProducts.map((product) => (
              <ShopifyProductCard
                key={product.node.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          // Show empty state or fallback to mock products
          <div className="grid grid-cols-2 gap-4">
            <SaleBanner />
            
            {mockProducts.length > 0 ? (
              // Fallback to mock products
              mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  collectionBadge={getBadgeText()}
                />
              ))
            ) : (
              // Empty state
              <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                <Package className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">No products found</h3>
                <p className="font-body text-muted-foreground max-w-md">
                  Your Shopify store doesn't have any products yet. Tell me what products you'd like to add and I'll create them for you!
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <ShopTrustSection />

      <Footer />
    </div>
  );
};

export default Shop;
