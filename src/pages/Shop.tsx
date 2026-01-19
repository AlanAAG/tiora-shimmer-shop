import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionHero from "@/components/shop/CollectionHero";
import CollectionFilter from "@/components/shop/CollectionFilter";
import ProductCard from "@/components/shop/ProductCard";
import SaleBanner from "@/components/shop/SaleBanner";
import ShopTrustSection from "@/components/shop/ShopTrustSection";
import { allProducts, Product } from "@/data/products";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Get collection from URL or default to "all"
  const collectionParam = searchParams.get("collection") as CollectionType || "all";
  const collection = collectionConfig[collectionParam] ? collectionParam : "all";
  
  const collectionName = collectionConfig[collection].name;
  const products = allProducts.filter(collectionConfig[collection].filter);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Collection Hero */}
      <CollectionHero 
        collectionName={collectionName} 
        collectionSlug={collection} 
      />

      {/* Filter Section */}
      <CollectionFilter productCount={products.length} />

      {/* Product Grid - 2 columns on mobile */}
      <section className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Sale Banner as first item */}
          <SaleBanner />
          
          {/* Product Cards */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              collectionBadge={getBadgeText()}
            />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <ShopTrustSection />

      <Footer />
    </div>
  );
};

export default Shop;
