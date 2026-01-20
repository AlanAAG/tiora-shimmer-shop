import { Product } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const images = product.images.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* Mobile/Tablet: Carousel with peek effect */}
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

      {/* Desktop: Grid layout */}
      <div className="hidden md:block space-y-4">
        {/* Top two vertical images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl">
            <img
              src={product.images[0]}
              alt={`${product.name} - View 1`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl">
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-3 py-1.5 font-body rounded-lg">
                Best Seller
              </span>
            )}
            <img
              src={product.images[1]}
              alt={`${product.name} - View 2`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2x2 Grid of images */}
        <div className="grid grid-cols-2 gap-4">
          {product.images.slice(2, 6).map((image, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden bg-muted rounded-2xl">
              <img
                src={image}
                alt={`${product.name} - View ${index + 3}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
