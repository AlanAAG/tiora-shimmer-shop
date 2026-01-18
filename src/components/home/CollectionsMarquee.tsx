import { Link } from "react-router-dom";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";
import heroImage from "@/assets/hero-image.jpg";

const collections = [
  { name: "All Items", image: heroImage, href: "/shop" },
  { name: "Best Sellers", image: productNecklace, href: "/shop?collection=best-sellers" },
  { name: "Bracelets", image: productBracelet, href: "/bracelets" },
  { name: "Necklaces", image: productNecklace, href: "/necklaces" },
  { name: "Earrings", image: productEarrings, href: "/earrings" },
];

const CollectionsMarquee = () => {
  return (
    <div className="bg-background overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 px-4 min-w-max py-2">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            to={collection.href}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-body text-foreground/80 group-hover:text-primary transition-colors">
              {collection.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsMarquee;
