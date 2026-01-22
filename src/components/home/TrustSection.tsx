import { Award, Heart, Eye, ShieldCheck } from "lucide-react";

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
  {
    icon: ShieldCheck,
    title: "Anti-Tarnish Guaranteed",
    description: "Protected by our signature 1-year finish and rub-off warranty",
  },
];

const TrustSection = () => {
  return (
    <section className="pt-4 pb-8 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Mobile Header - Outside beige */}
        <div className="text-center mb-4 md:hidden">
          <h2 className="font-display text-3xl text-foreground mb-2">
            Tiora <span className="text-primary">Assurance</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Crafted by experts, cherished by you
          </p>
        </div>

        {/* Trust Items - Side by Side with Beige Background */}
        <div className="bg-[hsl(35,30%,95%)] rounded-2xl p-5 md:p-10">
          {/* Tablet/Desktop Header - Inside beige */}
          <div className="hidden md:block text-center mb-8">
            <h2 className="font-display text-4xl text-foreground mb-2">
              Tiora <span className="text-primary">Assurance</span>
            </h2>
            <p className="font-body text-muted-foreground">
              Crafted by experts, cherished by you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-display text-sm md:text-base text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug">
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