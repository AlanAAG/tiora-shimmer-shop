import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getMediaUrl } from "@/lib/cloudinary";

const heroImage = getMediaUrl("collections/collections-hero", "image");

interface CollectionHeroProps {
  collectionName: string;
  collectionSlug: string;
  description?: string;
}

const CollectionHero = ({ collectionName, collectionSlug, description }: CollectionHeroProps) => {
  const defaultDescriptions: Record<string, string> = {
    "best-sellers": "The hype is real — don't scroll past our #1 best sellers.",
    "rings": "Adorn your fingers with timeless elegance.",
    "earrings": "Frame your face with stunning statement pieces.",
    "bracelets": "Wrap your wrist in luxury and style.",
    "necklaces": "Elevate every neckline with graceful designs.",
    "all": "Discover our complete collection of handcrafted jewelry.",
  };

  const heroDescription = description || defaultDescriptions[collectionSlug] || "Explore our curated collection.";

  return (
    <section className="px-0 md:px-8 lg:px-16 pt-0 md:pt-6 pb-2">
      <div className="relative w-full aspect-[4/3] md:aspect-[7/3] rounded-none md:rounded-2xl overflow-hidden">
        <img
          src={heroImage}
          alt={collectionName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Breadcrumb at top left */}
        <div className="absolute top-4 left-4">
          <Breadcrumb>
            <BreadcrumbList className="text-white/90">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white/90 hover:text-white underline text-sm">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/70" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white text-sm">
                  {collectionName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Title at bottom left */}
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2">
            {collectionName}
          </h1>
          <p className="font-body text-sm md:text-base text-white/90 max-w-md">
            {heroDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollectionHero;
