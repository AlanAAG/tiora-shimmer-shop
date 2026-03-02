import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";

const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const faqItems = [
  {
    question: "What is demi-fine jewellery, and how is Tiora different?",
    answer:
      "Demi-fine is the sweet spot between expensive solid gold and cheap, disposable fashion jewellery. While most artificial jewellery in India uses brass that tarnishes quickly, Tiora uses thick **18k gold plating** over a premium **316L stainless steel** core. This gives you the luxurious look of fine jewellery with the durability to withstand daily wear and Indian humidity, without the massive price tag.",
  },
  {
    question: "Is Tiora jewellery anti-tarnish and suitable for Indian weather?",
    answer:
      "Yes. Because our core metal is **Surgical-Grade Stainless Steel**, it will never rust or corrode. Combined with our thick 18k gold plating, Tiora pieces are highly resistant to **heat, sweat, and humidity**. While all plated jewellery naturally ages, our engineering ensures your pieces hold their rich colour significantly longer than standard fashion jewellery.",
  },
  {
    question: "Are your pieces skin-friendly?",
    answer:
      'Yes, 100%. The "green skin" effect is caused by copper and nickel found in cheap brass jewellery. Tiora pieces are **Hypoallergenic** and **Nickel-Free**. Our stainless steel core is biologically inert, making it completely safe and comfortable for sensitive skin.',
  },
  {
    question: "Can I gift Tiora jewellery?",
    answer:
      'Yes—and it makes a stunning impression. We don\'t do "plastic bags." Every order arrives in our **signature premium packaging**, designed to feel like a high-end personal gift. It is perfect for birthdays, anniversaries, or celebrating a career milestone.',
  },
  {
    question: "What are your shipping and return policies?",
    answer:
      "We deliver **Pan-India**, with express **24-48 hour delivery** available for many NCR pin codes. We back our quality with a **1-Year Warranty**. For returns, we accept unworn, unopened jewellery within our return window (for hygiene reasons, pieces that have been tried on cannot be returned).",
  },
];

const HomeFAQ = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="bg-[hsl(35,30%,95%)] rounded-2xl p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Frequently Asked Questions</h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left font-body text-base md:text-lg hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed text-sm md:text-base">
                  {renderBoldText(item.answer)}
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
