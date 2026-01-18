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
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Tiora <span className="text-primary">Assurance</span>
          </h2>
          <p className="font-body text-muted-foreground">
            Crafted by experts, cherished by you
          </p>
        </div>

        {/* Trust Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
