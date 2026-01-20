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
import { allProducts, Product } from "@/data/products";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { Loader2, Package } from "lucide-react";

type CollectionType = "all" | "best-sellers" | "rings" | "earrings" | "bracelets" | "necklaces";
type CategoryFilter = "all" | "rings" | "earrings" | "bracelets" | "necklaces";

// Map URL collection slugs to Shopify collection handles
const collectionHandleMap: Record<CollectionType, string> = {
  "all": "all-items",
  "best-sellers": "best-sellers",
  "rings": "rings",
  "earrings": "earrings",
  "bracelets": "bracelets",
  "necklaces": "necklaces",
};

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
  const shopifyCollectionHandle = collectionHandleMap[collection];
  
  // Show category filter only for "all" and "best-sellers"
  const showCategoryFilter = collection === "all" || collection === "best-sellers";
  
  // Apply both collection and category filters for mock products
  const mockProducts = allProducts.filter((p) => {
    const passesCollection = collectionConfig[collection].filter(p);
    const passesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return passesCollection && passesCategory;
  });

  // Fetch Shopify products by collection
  const { data: shopifyProducts, isLoading } = useShopifyCollection(shopifyCollectionHandle, 50);

  // Apply category filter to Shopify products (only for "all" and "best-sellers")
  const filteredShopifyProducts = shopifyProducts?.filter((product) => {
    if (categoryFilter === "all") return true;
    
    const { node } = product;
    const tags = node.tags.map(t => t.toLowerCase());
    const productType = node.productType.toLowerCase();
    const title = node.title.toLowerCase();
    
    const catLower = categoryFilter.toLowerCase();
    const catSingular = catLower.slice(0, -1);
    
    return tags.includes(catLower) || 
           tags.includes(catSingular) ||
           productType.includes(catLower) ||
           productType.includes(catSingular) ||
           title.includes(catLower) ||
           title.includes(catSingular);
  }) || [];

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

  const hasShopifyProducts = filteredShopifyProducts.length > 0;
  const totalProductCount = hasShopifyProducts 
    ? filteredShopifyProducts.length 
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
            {filteredShopifyProducts.map((product) => (
              <ShopifyProductCard
                key={product.node.id}
                product={product}
              />
            ))}
          </div>
        ) : shopifyProducts && shopifyProducts.length > 0 ? (
          // Shopify has products but none match current filter - show empty state
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SaleBanner />
            <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-20 text-center">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">No products in this collection</h3>
              <p className="font-body text-muted-foreground max-w-md">
                No products are tagged with "{collectionName}". Add the appropriate tags to your Shopify products to show them here.
              </p>
            </div>
          </div>
        ) : mockProducts.length > 0 ? (
          // Fallback to mock products - 4 columns on md+
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SaleBanner />
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                collectionBadge={getBadgeText()}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SaleBanner />
            <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-20 text-center">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">No products found</h3>
              <p className="font-body text-muted-foreground max-w-md">
                Your Shopify store doesn't have any products yet. Tell me what products you'd like to add and I'll create them for you!
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
