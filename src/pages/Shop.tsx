import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import CollectionHero from "@/components/shop/CollectionHero";
import FilterDrawer from "@/components/shop/FilterDrawer";
import ProductCard from "@/components/shop/ProductCard";
import ShopifyProductCard from "@/components/shop/ShopifyProductCard";
import SaleBanner from "@/components/shop/SaleBanner";
import ShopTrustSection from "@/components/shop/ShopTrustSection";
import { allProducts, Product } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2, Package } from "lucide-react";

type CollectionType = "all" | "best-sellers" | "rings" | "earrings" | "bracelets" | "necklaces";
type CategoryFilter = "all" | "rings" | "earrings" | "bracelets" | "necklaces";

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

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "necklaces", label: "Necklaces" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  // Get collection from URL or default to "all"
  const collectionParam = searchParams.get("collection") as CollectionType || "all";
  const collection = collectionConfig[collectionParam] ? collectionParam : "all";
  
  const collectionName = collectionConfig[collection].name;
  
  // Show category filter only for "all" and "best-sellers"
  const showCategoryFilter = collection === "all" || collection === "best-sellers";
  
  // Apply both collection and category filters
  const mockProducts = allProducts.filter((p) => {
    const passesCollection = collectionConfig[collection].filter(p);
    const passesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return passesCollection && passesCategory;
  });

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
    setCategoryFilter("all"); // Reset category filter when collection changes
  }, [collection]);

  const hasShopifyProducts = shopifyProducts && shopifyProducts.length > 0;
  const totalProductCount = hasShopifyProducts 
    ? shopifyProducts.length 
    : mockProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      
      {/* Collection Hero */}
      <CollectionHero 
        collectionName={collectionName} 
        collectionSlug={collection} 
      />

      {/* Filter Drawer */}
      <FilterDrawer 
        productCount={totalProductCount}
        categoryFilter={categoryFilter}
        onCategoryChange={(category) => setCategoryFilter(category as CategoryFilter)}
        showCategoryFilter={showCategoryFilter}
      />

      {/* Product Grid */}
      <section className="px-4 md:px-8 lg:px-16 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : hasShopifyProducts ? (
          // Shopify Products - 4 columns on md+
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SaleBanner />
            {shopifyProducts.map((product) => (
              <ShopifyProductCard
                key={product.node.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          // Show empty state or fallback to mock products - 4 columns on md+
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-20 text-center">
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
