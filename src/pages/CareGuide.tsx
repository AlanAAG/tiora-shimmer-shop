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
      "All Tiora jewelry is crafted with high-quality stainless steel as the base, finished with luxurious 18k gold plating. Our pieces are designed to be waterproof, hypoallergenic, and tarnish-resistant—perfect for everyday wear.",
  },
  {
    id: "general-care",
    title: "Waterproof & Life-Proof",
    content:
      "Wear it in the shower, at the gym, or while swimming—our 18k gold plating is built for life. Our stainless steel base ensures your jewelry won't turn your skin green. For the best shine, rinse with fresh water after exposure to chlorine or salt water.",
  },
  {
    id: "cleaning",
    title: "Cleaning Your Jewelry",
    content:
      "You can gently clean your jewelry with a soft, lint-free cloth to restore its shine. For a deeper clean, use mild soap and water. Since our pieces are waterproof, you don't need to worry about water damage during cleaning.",
  },
  {
    id: "storage",
    title: "Storage Tips",
    content:
      "Store your jewelry in a cool, dry place when not in use. While our pieces are durable, keeping them in a soft pouch helps prevent scratches from contact with other metal objects.",
  },
  {
    id: "durability",
    title: "Built to Last",
    content:
      "Our 18k gold PVD plating is up to 10x thicker than standard gold plating. This advanced process bonds the gold to the stainless steel at a molecular level, creating an incredibly durable finish that stands up to daily life.",
  },
];

const CareGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jewelry Care Guide | TIORA</title>
        <meta
          name="description"
          content="Learn how to care for your TIORA jewelry. Waterproof, tarnish-resistant 18k gold-plated stainless steel designed for everyday wear."
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
