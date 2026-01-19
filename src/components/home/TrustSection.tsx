import { Award, Heart, Eye } from "lucide-react";

const trustItems = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "Meticulously crafted by skilled artisans",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "Responsibly obtained materials",
  },
  {
    icon: Eye,
    title: "100% Transparency",
    description: "Know exactly what you're wearing",
  },
];

const TrustSection = () => {
  return (
    <section className="pt-4 pb-8 px-2 bg-background">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Tiora <span className="text-primary">Assurance</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Crafted by experts, cherished by you
          </p>
        </div>

        {/* Trust Items - Side by Side with Beige Background */}
        <div className="bg-[hsl(35,30%,95%)] rounded-2xl p-5 md:p-10 mx-1">
          <div className="flex flex-row justify-center items-start gap-4 md:gap-16">
            {trustItems.map((item, index) => (
              <div key={index} className="text-center flex-1 max-w-[200px]">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-display text-sm md:text-lg text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;