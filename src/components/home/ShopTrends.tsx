import { Link } from "react-router-dom";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";
import heroImage from "@/assets/hero-image.jpg";

const trends = [
  {
    id: 1,
    title: "Valentine's Day",
    description: "For your valentine, your galentine, and yourself",
    image: productNecklace,
    productIds: [1, 2],
  },
  {
    id: 2,
    title: "Serpentina",
    description: "Rebirth, Renewal, Resilience",
    image: productBracelet,
    productIds: [3, 4],
  },
  {
    id: 3,
    title: "Getaway",
    description: "Chase an endless summer",
    image: heroImage,
    productIds: [1, 3],
  },
  {
    id: 4,
    title: "Minimalist",
    description: "Elegant simplicity for every day",
    image: productEarrings,
    productIds: [2, 4],
  },
  {
    id: 5,
    title: "Statement",
    description: "Bold pieces that speak for themselves",
    image: productRing,
    productIds: [1, 2, 3],
  },
  {
    id: 6,
    title: "Layered Look",
    description: "Stack and layer your favorites",
    image: productNecklace,
    productIds: [1, 4],
  },
];

const ShopTrends = () => {
  const handleAddLook = (productIds: number[]) => {
    // This will be connected to Shopify cart later
    console.log("Adding products to cart:", productIds);
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Shop Trends
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Find this season's must-have styles to elevate any look.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {trends.map((trend) => (
            <button
              key={trend.id}
              onClick={() => handleAddLook(trend.productIds)}
              className="group text-left"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3">
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
