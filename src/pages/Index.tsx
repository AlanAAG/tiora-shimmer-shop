import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import CollectionsMarquee from "@/components/home/CollectionsMarquee";
import Hero from "@/components/home/Hero";
import MostPopular from "@/components/home/MostPopular";
import ShopTrends from "@/components/home/ShopTrends";
import TrustSection from "@/components/home/TrustSection";
import ReviewsSection from "@/components/home/ReviewsSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      <main className="pt-10 md:pt-20 lg:pt-24">
        <CollectionsMarquee />
        <Hero />
        <MostPopular />
        <ShopTrends />
        <TrustSection />
        <ReviewsSection />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
