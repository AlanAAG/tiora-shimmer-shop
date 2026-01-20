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
              <CarouselItem key={product.id} className="pl-4 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted rounded-2xl">
                    {product.isBestSeller && (
                      <span className="absolute top-2 left-2 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-2 py-1 rounded-lg font-body">
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
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border border-border" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 border border-border" />
                  </div>

                  <h3 className="font-display text-sm text-foreground mb-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-body mb-1.5">
                    18k Gold Plated
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap mb-2">
                    <span className="text-muted-foreground line-through text-[10px]">
                      {formatPrice(product.comparePrice)}
                    </span>
                    <span className="font-body text-xs text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-500 text-white text-[9px] px-1 py-0.5 rounded">
                      {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full text-xs h-8">
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
