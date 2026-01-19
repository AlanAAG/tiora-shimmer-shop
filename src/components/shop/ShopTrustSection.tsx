import { Package, RotateCcw } from "lucide-react";

const ShopTrustSection = () => {
  const trustItems = [
    {
      icon: Package,
      title: "Free Shipping",
      description: "Shipping is on us for any order ₹8,000+ within India",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Return or exchange within 14 days",
    },
  ];

  return (
    <section className="bg-secondary/80 px-4 py-10">
      <div className="grid grid-cols-2 gap-6">
        {trustItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
              <item.icon className="w-10 h-10 text-muted-foreground" strokeWidth={1} />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">
              {item.title}
            </h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopTrustSection;
