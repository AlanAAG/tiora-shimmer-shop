import { Button } from "@/components/ui/button";
import productRing from "@/assets/product-ring.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const products = [
  {
    id: 1,
    name: "Wave Sculpt Ring",
    price: 4500,
    image: productRing,
    isNew: true,
  },
  {
    id: 2,
    name: "Cascade Earrings",
    price: 5800,
    image: productEarrings,
    isNew: true,
  },
  {
    id: 3,
    name: "Fluid Link Bracelet",
    price: 7200,
    image: productBracelet,
    isNew: false,
  },
  {
    id: 4,
    name: "Liquid Flow Necklace",
    price: 9500,
    image: productNecklace,
    isNew: false,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated for You
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Featured Pieces
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">
                    New
                  </span>
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                <Button
                  variant="hero"
                  size="sm"
                  className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  Quick Add
                </Button>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
