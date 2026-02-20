import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { getMediaUrl } from "@/lib/cloudinary";

const productNecklace = getMediaUrl("products/product-necklace", "image");
const allItemsImage = getMediaUrl("homepage/carrousel/home-carrousel-all-items.png", "image");
const bestSellersImage = getMediaUrl("homepage/carrousel/home-carrousel-best-sellers.png", "image");
const braceletsImage = getMediaUrl("homepage/carrousel/home-carrousel-bracelets.png", "image");
const earringsImage = getMediaUrl("homepage/carrousel/home-carrousel-earrings.png", "image");
const ringsImage = getMediaUrl("homepage/carrousel/home-carrousel-rings.png", "image");

const collections = [
  { name: "All Items", image: allItemsImage, href: "/shop" },
  { name: "Best Sellers", image: bestSellersImage, href: "/shop/best-sellers" },
  { name: "Bracelets", image: braceletsImage, href: "/shop/bracelets" },
  { name: "Rings", image: ringsImage, href: "/shop/rings" },
  { name: "Earrings", image: earringsImage, href: "/shop/earrings" },
  { name: "Necklaces", image: productNecklace, href: "/shop/necklaces", comingSoon: true },
];

const CollectionsMarquee = () => {
  return (
    <div className="md:hidden bg-background overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-2 min-w-max py-0.5">
        {collections.map((collection) => (
          collection.comingSoon ? (
            <div
              key={collection.name}
              className="flex flex-col items-center gap-1 group"
              aria-disabled="true"
              title="Coming soon"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-border transition-all duration-300">
                <img
                  src={collection.image}
                  alt={`${collection.name} (Coming soon)`}
                  className="w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-background/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-1">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background/80 border border-border shadow-card">
                    <Lock className="w-4 h-4 text-foreground" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] leading-tight font-body text-foreground">Coming soon</span>
                </div>
              </div>
              <span className="text-xs font-body text-foreground/60">{collection.name}</span>
            </div>
          ) : (
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
          )
        ))}
      </div>
    </div>
  );
};

export default CollectionsMarquee;
