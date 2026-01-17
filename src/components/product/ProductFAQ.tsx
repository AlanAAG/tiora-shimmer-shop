import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  items: FAQItem[];
}

export const ProductFAQ = ({ items }: ProductFAQProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-10">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-body text-base hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
