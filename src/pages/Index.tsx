import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import CollectionsMarquee from "@/components/home/CollectionsMarquee";
import Hero from "@/components/home/Hero";
import MostPopular from "@/components/home/MostPopular";
import ShopTrends from "@/components/home/ShopTrends";
import TrustSection from "@/components/home/TrustSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import { Helmet } from "react-helmet-async";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>TIORA | Sculptural Silver Jewelry for Modern Women</title>
        <meta
          name="description"
          content="Discover TIORA's liquid metal silver jewelry collection. Bold, sculptural designs for confident women who make their own rules. Premium 925 silver, ₹3,000-₹10,000."
        />
        <link rel="canonical" href="https://tiora.in/" />
      </Helmet>
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      <main className="pt-[108px] md:pt-20 lg:pt-24">
        <CollectionsMarquee />
        <Hero />
        <MostPopular />
        <ShopTrends />
        <TrustSection />
        <ReviewsSection />
        <HomeFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
