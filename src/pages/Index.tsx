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
        <title>TIORA | Premium 18k Gold-Plated & Waterproof Jewelry</title>
        <meta
          name="description"
          content="Shop Tiora's premium 18k gold-plated jewelry. Waterproof, tarnish-resistant, and hypoallergenic stainless steel pieces designed in Gurgaon for everyday elegance."
        />
        <link rel="canonical" href="https://tiora.co/" />
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
