import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const faqSections = [
  {
    title: "The Product & Materials",
    items: [
      {
        question: "What is demi-fine jewellery, exactly?",
        answer:
          "Ordinary fashion jewellery fades, breaks, and doesn't last, while solid gold is an expensive investment usually kept in a locker. **Demi-fine jewellery** is the modern middle ground. It uses premium base metals—like our **316L surgical-grade stainless steel**—finished with a thick, high-quality layer of **18k gold plating**. This engineering allows us to create jewellery that is on-trend, highly durable, and anti-tarnish, so you can wear luxury every day in the Indian climate without the heavy fine-jewellery price tag.",
      },
      {
        question: "What materials are used in Tiora jewellery?",
        answer:
          "We engineer our jewellery for maximum durability and style. The core of every Tiora piece is solid **316L Stainless Steel**, the exact same non-reactive, rust-proof grade used in luxury watches and medical instruments. This provides satisfying weight and structural strength. It is then finished with a premium layer of genuine **18k Gold plating** (or Sterling Silver tone) to give you the luxurious look of fine jewellery without the fragile, easily oxidized nature of soft base metals like brass or copper.",
      },
      {
        question: "What does 2.5-micron 18k gold plating mean?",
        answer:
          'Micron thickness measures the actual layer of real gold bonded to the base metal. Standard mass-market "artificial" jewellery typically uses "flash plating" (under 0.5 microns), which rubs off in weeks. Tiora uses a premium **2.5-micron thickness** of **18k gold**. This substantial, heavy gold layer is the defining characteristic of true demi-fine jewellery, guaranteeing superior colour retention, exceptional durability against daily friction, and a rich finish that lasts.',
      },
      {
        question: "Are your pieces skin-friendly and safe for sensitive skin?",
        answer:
          'Yes, 100%. If you have a history of metal allergies, Tiora offers a medically safe alternative. The dreaded "green skin" effect is caused by chemical reactions with copper or nickel found in cheap brass jewellery. Tiora pieces are **hypoallergenic**, **lead-free**, and completely **nickel-free**. Our surgical-grade stainless steel core is biologically inert, meaning it will never rust, oxidize, or leave a green mark on your skin, even during long hours of wear in hot, sweaty weather.',
      },
      {
        question: "Is gold-plated jewellery worth it?",
        answer:
          "Absolutely—if the core and plating thickness are right. Cheap plating fails because the mystery metal underneath corrodes. Tiora jewellery is distinct because the core is **rust-proof stainless steel**. Even if the thick 18k gold plating eventually softens after years of daily love, you are left with a high-polished, silver-tone piece that remains wearable forever. You are investing in a **long-lasting wardrobe staple**, not a disposable accessory.",
      },
      {
        question: "Does it look like real gold?",
        answer:
          'Yes. We specifically use **18k Gold** for our plating because it provides a warm, rich, and elegant tone. It completely avoids the harsh, fake "yellow" look often seen in cheap 24k plated costume jewellery. Because of this authentic tone, Tiora pieces match seamlessly with your existing solid gold fine jewellery.',
      },
    ],
  },
  {
    title: "Care, Climate & Longevity",
    items: [
      {
        question: "How long does the gold plating last?",
        answer:
          "With mindful care, the shine of our demi-fine jewellery can last for years. Because we plate our 18k gold over hard, durable stainless steel rather than soft brass, the finish is incredibly robust and highly resistant to **Indian heat and humidity**. However, because it is a plated layer, its ultimate lifespan depends on how you treat it. Keeping it away from abrasive surfaces and harsh chemicals will maximize its longevity.",
      },
      {
        question: "Can I wear this in the shower, pool, or gym?",
        answer:
          "Tiora pieces are highly **water-resistant** and **sweat-proof**. The stainless steel core is 100% waterproof and will never rust. It can easily handle washing your hands, light rain, or a humid commute. However, to keep the 18k gold plating looking mirror-perfect for years, we recommend treating it like a luxury asset: remove it before taking long daily showers, swimming in chlorinated pools or the sea, or engaging in heavy, high-sweat gym sessions.",
      },
      {
        question: "How do I care for and clean my jewellery at home?",
        answer:
          "Keep it simple. Treat your pieces like a tailored silk blazer—durable, but better kept dry. After a long day, gently wipe the piece with a **soft, dry microfiber cloth** to remove body oils, sweat, and urban pollution. Never use toothpaste, harsh chemical liquid cleaners, or abrasive polishing cloths, as these will aggressively scratch and strip the protective gold layer.",
      },
      {
        question: "Can perfumes or lotions damage my Tiora jewellery?",
        answer:
          'Yes. The chemicals and alcohols in perfumes, hairsprays, and body lotions can dull any plated surface over time. **The Golden Rule:** Your jewellery should be the **last thing you put on** before leaving the house, and the **first thing you take off** when you get home. Spray your perfume and let it dry completely before putting on your necklaces or earrings.',
      },
    ],
  },
  {
    title: "Styling & Gifting",
    items: [
      {
        question: "How do I know which necklace or ring suits me best?",
        answer:
          "Match your jewellery to your daily agenda.\n\n**For the Keyboard Warrior:** If your day involves heavy typing or deep focus, opt for our smooth, minimalist rings and sleek bracelets that offer polish without snagging on clothes or keyboards.\n\n**For the Power Dresser:** If you are leading a presentation or wearing a blazer, choose our bold statement chains or sculpted hoops. These designs are crafted to be commanding focal points that elevate a simple shirt or suit.\n\n**Still Unsure?** Start with our **Bestsellers**, curated specifically to be versatile staples for the modern professional.",
      },
      {
        question: "Can I style Tiora pieces with my real solid gold jewellery?",
        answer:
          'Yes. Because our **18k gold plating** mimics the exact warmth and richness of traditional Indian fine jewellery, you can seamlessly stack Tiora rings, bracelets, and necklaces alongside your existing solid gold or diamond pieces without them looking mismatched or "cheap."',
      },
      {
        question: "Can I gift Tiora jewellery?",
        answer:
          'Yes—and it will make a stunning impression. We don\'t do "plastic bags." Every order arrives in our **signature premium packaging**, designed to feel like a high-end personal gift. The packaging also doubles as a safe, dry storage space. It is perfect for birthdays, anniversaries, or celebrating a career milestone.',
      },
    ],
  },
  {
    title: "Orders, Payments & Shipping",
    items: [
      {
        question: "Is buying jewellery online safe?",
        answer:
          "With Tiora, yes. We use encrypted **128-bit payment gateways** (the same security used by major Indian banks) via **Razorpay** to ensure your transaction is completely private and secure. We are a transparent, registered Indian business that lists all product specs clearly. What you see on the screen is exactly what arrives in the beautiful box.",
      },
      {
        question: "Do you offer Cash on Delivery (COD)?",
        answer:
          "To maintain streamlined operations, ensure fast dispatch times, and offer the best possible pricing on our demi-fine engineering, we operate as a **Prepaid-Only** brand. We securely accept all major **credit/debit cards** and **UPI**.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "We ship **Pan-India** through premium, reliable courier partners.\n\n**Order Processing:** 1–3 business days.\n\n**Estimated Delivery:** 3–7 business days across India.\n\n**Delhi/NCR Residents:** We prioritize these pin codes. Orders in Delhi/Gurgaon usually arrive within rapid **24–48 hour** windows.\n\n(Note: While we aim for speed, delays caused by courier partners or external weather factors are beyond Tiora's control).",
      },
    ],
  },
  {
    title: "Returns, Refunds & Warranty",
    items: [
      {
        question: "What is your Return & Refund Policy?",
        answer:
          "We maintain strict quality and hygiene standards. Therefore, we do not offer open exchanges. However, if you are not completely satisfied, you may return **unworn, unopened items** for a **Refund** within our allowed timeframe. For hygiene and safety reasons, once a product has been worn or tried on, it cannot be returned. Upon passing inspection, **100% of the purchase amount** (excluding return shipping charges) will be refunded to your original payment method.",
      },
      {
        question: "What if I receive a damaged product?",
        answer:
          "We take quality control incredibly seriously. However, in the rare event of damage during transit, complaints must be reported to our support team within **24 hours of delivery**, along with clear photo or video proof. Please email us immediately, and we will resolve the issue for you swiftly.",
      },
      {
        question: "Do Tiora pieces come with a warranty?",
        answer:
          "Yes. We stand confidently behind our materials and craftsmanship. Every Tiora piece is backed by a **1-Year Warranty** against manufacturing and structural defects (such as faulty clasps or breaking). Please note that this warranty does not cover normal wear and tear, scratching, or the natural fading of gold plating due to water or chemical exposure.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Frequently Asked Questions | TIORA" description="Find answers about Tiora's demi-fine jewellery: 316L stainless steel, 18k gold plating, hypoallergenic materials, care tips, Pan-India shipping, returns & warranty.">
        
        
        <link rel="canonical" href="https://tiora.co/faq" />
      </SEO>
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
                        {renderBoldText(item.answer)}
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
