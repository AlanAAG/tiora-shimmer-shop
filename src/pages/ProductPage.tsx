import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductMarquee } from "@/components/product/ProductMarquee";
import { CollectionStory } from "@/components/product/CollectionStory";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { ProductReviews } from "@/components/product/ProductReviews";
import { getProductBySlug, allProducts, sampleReviews, faqItems } from "@/data/products";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProductInfo } from "@/components/product/ShopifyProductInfo";
import { ShopifyImageGallery } from "@/components/product/ShopifyImageGallery";
import { ChevronLeft, Loader2 } from "lucide-react";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to get Shopify product first
  const { data: shopifyProduct, isLoading: shopifyLoading } = useShopifyProduct(slug);
  const { data: shopifyProducts } = useShopifyProducts(8);
  
  // Fallback to mock product
  const mockProduct = slug ? getProductBySlug(slug) : undefined;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (shopifyLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <DiscountBanner />
        </div>
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  // Use Shopify product if available
  if (shopifyProduct) {
    const relatedProducts = shopifyProducts?.filter(p => p.node.handle !== slug).slice(0, 4) || [];
    
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <DiscountBanner />
        </div>
        <Header />
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 pt-32 pb-4">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>

        {/* Main Product Section */}
        <section className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <ShopifyImageGallery product={shopifyProduct} />
            </div>
            <div className="lg:col-span-5">
              <ShopifyProductInfo product={shopifyProduct} />
            </div>
          </div>
        </section>

        {/* Marquee */}
        <ProductMarquee />

        {/* FAQ Section */}
        <ProductFAQ items={faqItems} />

        <Footer />
      </div>
    );
  }

  // Fallback to mock product
  if (!mockProduct) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <DiscountBanner />
        </div>
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary underline">
            Return to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-32 pb-4">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Main Product Section - Two Column Layout */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Images (wider) */}
          <div className="lg:col-span-7">
            <ProductImageGallery product={mockProduct} />
          </div>
          
          {/* Right Column - Product Info */}
          <div className="lg:col-span-5">
            <ProductInfo 
              product={mockProduct} 
              reviews={sampleReviews} 
              carouselProducts={allProducts.filter(p => p.id !== mockProduct.id).slice(0, 8)}
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <ProductMarquee />

      {/* Collection Story Section */}
      <CollectionStory product={mockProduct} />

      {/* FAQ Section */}
      <ProductFAQ items={faqItems} />

      {/* Reviews Section */}
      <ProductReviews reviews={sampleReviews} product={mockProduct} />

      <Footer />
    </div>
  );
};

export default ProductPage;
