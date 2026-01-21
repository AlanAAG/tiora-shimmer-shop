import { Link } from "react-router-dom";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";
import allItemsImage from "@/assets/collections-all-items.png";
import bestSellersImage from "@/assets/collections-best-sellers.png";

const collections = [
  { name: "All Items", image: allItemsImage, href: "/shop" },
  { name: "Best Sellers", image: bestSellersImage, href: "/shop?collection=best-sellers" },
  { name: "Bracelets", image: productBracelet, href: "/bracelets" },
  { name: "Necklaces", image: productNecklace, href: "/necklaces" },
  { name: "Earrings", image: productEarrings, href: "/earrings" },
];

const CollectionsMarquee = () => {
  return (
    <div className="md:hidden bg-background overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-2 min-w-max py-0.5">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            to={collection.href}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
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
