import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import CollectionsMarquee from "@/components/home/CollectionsMarquee";
import Hero from "@/components/home/Hero";
import MostPopular from "@/components/home/MostPopular";
import ShopTrends from "@/components/home/ShopTrends";
import TrustSection from "@/components/home/TrustSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DiscountBanner />
      <Header />
      <main className="pt-16 lg:pt-20">
        <CollectionsMarquee />
        <Hero />
        <MostPopular />
        <ShopTrends />
        <TrustSection />
        <ReviewsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
