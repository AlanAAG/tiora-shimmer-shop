import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductMarquee } from "@/components/product/ProductMarquee";
import { CollectionStory } from "@/components/product/CollectionStory";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { ProductReviews } from "@/components/product/ProductReviews";
import { getProductBySlug, allProducts, sampleReviews, faqItems } from "@/data/products";
import { ChevronLeft } from "lucide-react";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
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
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-24 pb-4">
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
            <ProductImageGallery product={product} />
          </div>
          
          {/* Right Column - Product Info */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} reviews={sampleReviews} />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <ProductMarquee />

      {/* Collection Story Section */}
      <CollectionStory product={product} />

      {/* Product Carousel */}
      <ProductCarousel 
        title="You May Also Like" 
        products={allProducts.filter(p => p.id !== product.id).slice(0, 8)} 
      />

      {/* FAQ Section */}
      <ProductFAQ items={faqItems} />

      {/* Reviews Section */}
      <ProductReviews reviews={sampleReviews} product={product} />

      <Footer />
    </div>
  );
};

export default ProductPage;
