import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const faqSections = [
  {
    title: "The Product & Materials",
    items: [
      {
        question: "What is demi-fine jewellery, exactly?",
        answer:
          "Ordinary fashion jewellery fades, breaks, and doesn't last. Solid gold is an investment you keep in a locker. At Tiora, we built the middle ground—a new category called Demi-fine. We use thick 18k gold plating over premium stainless steel. This engineering allows us to create jewellery that is on-trend, lasting, and high on quality, so you can wear luxury every day without the heavy price tag.",
      },
      {
        question: "What materials are used?",
        answer:
          "We engineer our jewellery for durability and style. The core is solid 316L Stainless Steel—the same grade used in luxury watches—which provides weight and strength. It is then finished with a layer of 18k Gold or Sterling Silver plating to give you the luxurious look of fine jewellery without the fragile nature of soft metals like brass.",
      },
      {
        question: "Are your pieces skin-friendly?",
        answer:
          'Yes, 100%. The "green ring" on skin is caused by chemical reactions with copper or nickel found in cheap brass jewellery. Tiora pieces use a Surgical-Grade Stainless Steel core which is biologically inert and Nickel-Free. It will never rust, oxidize, or leave a green mark on your skin, even in the Indian heat.',
      },
      {
        question: "Is gold plated jewellery worth it?",
        answer:
          "Absolutely—if the core is right. Cheap plating fails because the metal underneath (brass/copper) corrodes. Tiora jewellery is distinct because the core is Stainless Steel. Even if the plating eventually softens over years of love, you are left with a high-polished, rust-proof silver-tone piece that remains wearable forever. You are investing in longevity.",
      },
      {
        question: "Does it look like real gold?",
        answer:
          'Yes. We use 18k Gold for our plating, which gives a warm, rich tone (unlike the fake "yellow" look of 24k plating). It matches perfectly with your existing fine gold jewellery.',
      },
    ],
  },
  {
    title: "Care & Longevity",
    items: [
      {
        question: "How do I care for my jewellery?",
        answer:
          "Treat it like a tailored silk blazer—durable, but better kept dry.\n\nLast On, First Off: Wear your jewellery after applying perfume and lotion.\n\nKeep it Dry: While the steel core is waterproof, the gold plating lasts longer if protected. Remove it before showering or heavy gym sessions.\n\nWipe it Down: Use a soft cloth after wearing to remove body oils that can dull the shine.",
      },
      {
        question: "How long does the gold plating last?",
        answer:
          "With mindful care, the shine can last for years. Because we plate over Steel (a hard, durable metal) rather than soft brass, the finish is robust. However, since this is traditional plating, it deserves care. To keep the finish distinct, we recommend keeping it away from heavy sweat, water, and perfumes.",
      },
      {
        question: "Can I wear this in the shower or gym?",
        answer:
          "We recommend treating your jewellery like a luxury asset. While our 316L Stainless Steel core is waterproof and rust-proof, the 18k Gold Plating deserves care. To keep the gold shining for years, avoid harsh soaps, perfumes, and heavy sweat. Think of it like a tailored blazer—durable, but you wouldn't swim in it.",
      },
    ],
  },
  {
    title: "Styling & Gifting",
    items: [
      {
        question: "How do I know which necklace or ring suits me best?",
        answer:
          'Look at your workday.\n\nFor the Keyboard Warrior: If you type all day, choose smooth bands or stackable rings that won\'t snag on clothes or keyboards.\n\nFor the Power Dresser: If you wear collared shirts or blazers, a short pendant or a structured chain adds a perfect focal point without looking "messy."\n\nStill Unsure? Start with our Bestsellers. They are curated specifically to be versatile staples for the modern professional.',
      },
      {
        question: "Can I gift Tiora jewellery?",
        answer:
          'Yes—and it will make an impression. We don\'t do "plastic bags." Every order arrives in our signature packaging, designed to feel like a high-end personal gift. It is perfect for birthdays, anniversaries, or celebrating a career milestone.',
      },
    ],
  },
  {
    title: "Orders, Payments & Shipping",
    items: [
      {
        question: "Is buying jewellery online safe?",
        answer:
          "With Tiora, yes. We use encrypted 128-bit payment gateways (the same security used by major banks) to ensure your transaction is private. Plus, we are a transparent, registered Indian business. We list all product specs clearly and back our quality with a warranty. What you see on the screen is exactly what arrives in the box.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "We ship across all of India.\n\nOrder Processing: 1–3 business days.\n\nEstimated Delivery: 3–7 business days.\n\nNCR Residents: Orders in Delhi/Gurgaon usually arrive within 24-48 hours.\n\nNote: While we aim for speed, delays caused by courier partners or external factors are not Tiora's liability.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your Return & Refund Policy?",
        answer:
          "We maintain strict quality standards. Therefore, we do not offer exchanges or replacements. However, if you are not completely satisfied, you may return the item for a Refund Only, subject to inspection.\n\nEligibility: The request must be raised within the allowed timeframe. The product must be unused, unworn, with original tags and packaging intact.\n\nProcess: Once your return is approved via email, you will receive instructions to ship the product back to us.\n\nRefund: Upon passing inspection, 100% of the purchase amount (excluding shipping charges) will be refunded to your original payment method.",
      },
      {
        question: "What if I receive a damaged product?",
        answer:
          "We take quality control seriously. However, in the rare event of damage during transit, complaints must be reported within 24 hours of delivery along with clear photo/video proof. Please email our support team immediately, and we will resolve it for you.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Frequently Asked Questions | TIORA</title>
        <meta
          name="description"
          content="Find answers to your questions about TIORA's jewelry, materials (18k gold plating, stainless steel), care instructions, shipping, and returns."
        />
        <link rel="canonical" href="https://tiora.co/faq" />
      </Helmet>
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      <main className="pt-[108px] md:pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-background">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to know about Tiora jewellery, from materials and care to shipping and returns.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-background">
          <div className="mx-auto max-w-4xl space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 pb-3 border-b border-border">
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`section-${sectionIndex}-item-${itemIndex}`}
                      className="border-border/50"
                    >
                      <AccordionTrigger className="text-left font-body text-base md:text-lg hover:no-underline py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-body leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
