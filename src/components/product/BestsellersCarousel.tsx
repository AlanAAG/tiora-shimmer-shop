import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

interface BestsellersCarouselProps {
  products: Product[];
  title?: string;
}

export const BestsellersCarousel = ({ 
  products, 
  title = "Recommended Products" 
}: BestsellersCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoScroll({ 
        speed: 0.8, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true 
      })
    ]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products.length) return null;

  // Filter to only bestsellers
  const bestsellers = products.filter(p => p.isBestSeller);
  const displayProducts = bestsellers.length >= 4 ? bestsellers : products.slice(0, 8);

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl text-foreground">
            {title}
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollPrev}
              className="h-10 w-10 rounded-full border-border hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollNext}
              className="h-10 w-10 rounded-full border-border hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 pl-4 md:pl-[calc((100%-72rem)/2+1.5rem)]">
          {/* Duplicate products for seamless infinite scroll */}
          {[...displayProducts, ...displayProducts].map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className="flex-none w-[45%] md:w-[22%]"
            >
              <Link to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted rounded-xl border border-accent">
                  {product.isBestSeller && (
                    <span className="absolute top-2 left-2 z-10 bg-muted/90 backdrop-blur-sm text-foreground text-[10px] tracking-wide uppercase px-2 py-1 rounded font-medium">
                      Best Seller
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display text-sm text-foreground line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {product.comparePrice > product.price && (
                      <span className="font-body text-xs text-muted-foreground line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                    <span className="font-body text-sm font-medium text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  {/* Material indicator */}
                  <div className="flex items-center gap-2 pt-1">
                    <span 
                      className={`w-3 h-3 rounded-full border border-border ${
                        product.materials.includes("gold") 
                          ? "bg-amber-400" 
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="font-body text-xs text-muted-foreground">
                      {product.materials.includes("gold") ? "Gold Plated" : "Silver Plated"}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
