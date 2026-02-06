import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import careGuideHero from "@/assets/care-guide-hero.jpg";
import { Helmet } from "react-helmet-async";

const careGuideItems = [
  {
    id: "materials",
    title: "Our Materials",
    content:
      "All Tiora jewellery is crafted with high-quality stainless steel as the base, finished with luxurious 18k gold plating or elegant silver plating. Our pieces are designed to be durable, hypoallergenic, and resistant to tarnishing—perfect for everyday wear while maintaining their beautiful lustre.",
  },
  {
    id: "general-care",
    title: "General Care",
    content:
      "To safeguard the shine of your jewellery and its plating, avoid exposing it to excessive water, perfumes, lotions, and sweat. We recommend always removing your jewellery before swimming, exercising, or bathing. Putting on your jewellery should be the last step of your routine—after applying makeup, perfume, and hairspray.",
  },
  {
    id: "cleaning",
    title: "Cleaning Your Jewellery",
    content:
      "You can gently clean your jewellery with a soft, lint-free cloth after each use to remove any dirt, oils, or residue. For a deeper clean, use a mild soap diluted in lukewarm water, gently rub the piece, rinse with clean water, and pat dry immediately. Never use harsh chemicals, abrasive cleaners, or ultrasonic cleaners on plated jewellery.",
  },
  {
    id: "storage",
    title: "Storage Tips",
    content:
      "Store your jewellery in a cool, dry place away from direct sunlight. Keep each piece separately in a soft pouch or lined jewellery box to prevent scratching and tangling. Avoid storing jewellery in humid environments like bathrooms, as moisture can accelerate tarnishing. Consider using anti-tarnish strips in your storage area for added protection.",
  },
  {
    id: "avoid",
    title: "Things to Avoid",
    content:
      "To extend the life of your jewellery, avoid contact with chlorine, saltwater, household cleaning products, and harsh chemicals. Remove jewellery before activities that may cause impact or abrasion. Avoid sleeping in your jewellery, as this can cause wear and damage. Keep away from extreme temperatures and sudden temperature changes.",
  },
];

const CareGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jewelry Care Guide | TIORA</title>
        <meta
          name="description"
          content="Learn how to care for your TIORA jewelry. Tips on cleaning, storage, and maintenance to keep your plated silver and gold pieces looking beautiful."
        />
        <link rel="canonical" href="https://tiora.in/care-guide" />
      </Helmet>
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />

      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="text-center px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Tiora's Care Guide
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-md mx-auto">
            Get the most out of your accessories
          </p>
        </section>

        {/* Image & Accordion Section */}
        <section className="px-6 max-w-6xl mx-auto pb-16">
          <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
            {/* Hero Image */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={careGuideHero}
                alt="Elegant gold jewellery care"
                className="w-full h-auto object-cover rounded-2xl md:sticky md:top-40"
              />
            </div>

            {/* Accordion */}
            <div className="md:w-1/2">
              <Accordion type="single" collapsible className="w-full">
                {careGuideItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-border">
                    <AccordionTrigger className="text-left font-display text-lg md:text-xl py-6 hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-6">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareGuide;
