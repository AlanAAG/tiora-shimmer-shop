import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-10">
          {title}
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-square mb-4 overflow-hidden bg-muted border border-border">
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-2 py-1 font-body">
                        Best Seller
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Material Options */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border border-border" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 border border-border" />
                  </div>

                  <h3 className="font-display text-base text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    18k Gold Plated
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-muted-foreground line-through text-xs">
                      {formatPrice(product.comparePrice)}
                    </span>
                    <span className="font-body text-sm text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                      {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    ADD+
                  </Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-background border-border hover:bg-muted" />
          <CarouselNext className="hidden md:flex -right-4 bg-background border-border hover:bg-muted" />
        </Carousel>
      </div>
    </section>
  );
};
