import { Link } from "react-router-dom";
import { getMediaUrl } from "@/lib/cloudinary";

const productRing = getMediaUrl("products/product-ring", "image");
const productEarrings = getMediaUrl("products/product-earrings", "image");
const productBracelet = getMediaUrl("products/product-bracelet", "image");
const productNecklace = getMediaUrl("products/product-necklace", "image");

const categories = [
  {
    name: "Rings",
    image: productRing,
    href: "/rings",
    count: 24,
  },
  {
    name: "Earrings",
    image: productEarrings,
    href: "/earrings",
    count: 32,
  },
  {
    name: "Bracelets",
    image: productBracelet,
    href: "/bracelets",
    count: 18,
  },
  {
    name: "Necklaces",
    image: productNecklace,
    href: "/necklaces",
    count: 21,
  },
];

const Categories = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Shop by Category
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[3/4] overflow-hidden hover-lift"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-1">
                  {category.name}
                </h3>
                <p className="font-body text-xs tracking-widest uppercase text-primary-foreground/70">
                  {category.count} Pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
