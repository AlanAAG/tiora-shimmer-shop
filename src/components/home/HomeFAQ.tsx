import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "What is demi-fine jewellery, exactly?",
    answer: "Ordinary fashion jewellery fades, breaks, and doesn't last. Solid gold is an investment you keep in a locker.\n\nAt Tiora, we built the middle ground—a new category called Demi-fine. We use thick 18k gold plating over premium stainless steel. This engineering allows us to create jewellery that is on-trend, lasting, and high on quality, so you can wear luxury every day without the heavy price tag.",
  },
  {
    question: "Is buying jewellery online safe?",
    answer: "With Tiora, yes. We use encrypted 128-bit payment gateways (the same security used by major banks) to ensure your transaction is private. Plus, we are a transparent, registered Indian business. We list all product specs clearly and back our quality with a warranty. What you see on the screen is exactly what arrives in the box.",
  },
  {
    question: "How do I know which necklace or ring suits me best?",
    answer: "Look at your workday.\n\nFor the Keyboard Warrior: If you type all day, choose smooth bands or stackable rings that won't snag on clothes or keyboards.\n\nFor the Power Dresser: If you wear collared shirts or blazers, a short pendant or a structured chain adds a perfect focal point without looking 'messy.'\n\nStill Unsure? Start with our Bestsellers. They are curated specifically to be versatile staples for the modern professional.",
  },
  {
    question: "Is gold plated jewellery worth it?",
    answer: "Absolutely—if the core is right. Cheap plating fails because the metal underneath (brass/copper) corrodes. Tiora jewellery is distinct because the core is Stainless Steel. Even if the plating eventually softens over years of love, you are left with a high-polished, rust-proof silver-tone piece that remains wearable forever. You are investing in longevity.",
  },
  {
    question: "Can I gift Tiora jewellery?",
    answer: "Yes—and it will make an impression. We don't do 'plastic bags.' Every order arrives in our signature packaging, designed to feel like a high-end personal gift. It is perfect for birthdays, anniversaries, or celebrating a career milestone.",
  },
];

const HomeFAQ = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="bg-[hsl(35,30%,95%)] rounded-2xl p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
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

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="rounded-xl px-8 py-3 h-auto font-body text-base border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
            >
              <Link to="/faq">Read All FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
