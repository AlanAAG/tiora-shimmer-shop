import { getMediaUrl } from "@/lib/cloudinary";
import { toast } from "sonner";

const trendSculptedSilver = getMediaUrl("homepage/trends/home-trends-sculptured-silver", "image", { width: 600 });
const trendMoltenFlow = getMediaUrl("homepage/trends/home-trends-molten-flow", "image", { width: 600 });
const trendGoldenCascade = getMediaUrl("homepage/trends/home-trends-golden-cascade", "image", { width: 600 });
const trendArchitecturalGold = getMediaUrl("homepage/trends/home-trends-architectural-gold", "image", { width: 600 });
const trendHammeredGold = getMediaUrl("homepage/trends/home-trends-hammered-gold", "image", { width: 600 });
const trendSculpturalGold = getMediaUrl("homepage/trends/home-trends-sculptural-gold", "image", { width: 600 });

const trends = [
  {
    id: 1,
    title: "Sculpted Silver",
    description: "Cool tones for effortless polish.",
    image: trendSculptedSilver,
    productIds: [1, 2],
  },
  {
    id: 2,
    title: "Molten Flow",
    description: "Soft curves that catch every light.",
    image: trendMoltenFlow,
    productIds: [3, 4],
  },
  {
    id: 3,
    title: "Golden Cascade",
    description: "Artful design for a striking finish.",
    image: trendGoldenCascade,
    productIds: [1, 3],
  },
  {
    id: 4,
    title: "Architectural Gold",
    description: "Clean pieces for a sharp look.",
    image: trendArchitecturalGold,
    productIds: [2, 4],
  },
  {
    id: 5,
    title: "Hammered Gold",
    description: "A rich finish for immediate impact.",
    image: trendHammeredGold,
    productIds: [1, 2, 3],
  },
  {
    id: 6,
    title: "Sculptural Gold",
    description: "Fine details for a sophisticated edge.",
    image: trendSculpturalGold,
    productIds: [1, 4],
  },
];

const ShopTrends = () => {
  const handleAddLook = (productIds: number[]) => {
    // This will be connected to Shopify cart later
    console.log("Adding products to cart:", productIds);
    toast("Coming Soon", {
      description: "This feature will be available shortly.",
    });
  };

  return (
    <section className="pt-0 pb-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Shop Trends
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Find this season's must-have styles to elevate any look.
          </p>
        </div>

        {/* 2x3 Grid - Fixed height rows for alignment */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {trends.map((trend) => (
            <button
              key={trend.id}
              onClick={() => handleAddLook(trend.productIds)}
              className="group text-left flex flex-col"
            >
              {/* Image - Fixed aspect ratio for alignment */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-2 w-full">
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>

              {/* Info */}
              <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                {trend.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {trend.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopTrends;
