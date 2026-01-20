import { useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const images = product.images.slice(0, 6);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <div className="space-y-4">
      {/* Mobile: Carousel with peek effect */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-3 basis-[85%]">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl">
                  {index === 1 && product.isBestSeller && (
                    <span className="absolute top-4 left-4 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-3 py-1.5 font-body rounded-lg">
                      Best Seller
                    </span>
                  )}
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop/iPad: Single image carousel with thumbnails */}
      <div className="hidden md:block space-y-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-2xl">
                  {index === 0 && product.isBestSeller && (
                    <span className="absolute top-4 left-4 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-3 py-1.5 font-body rounded-lg">
                      Best Seller
                    </span>
                  )}
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Progress Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  current === index 
                    ? "bg-foreground w-4" 
                    : "bg-foreground/40 hover:bg-foreground/60"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>

        {/* Thumbnail Previews */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "flex-shrink-0 w-16 h-20 overflow-hidden rounded-xl border-2 transition-all",
                current === index 
                  ? "border-foreground" 
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
