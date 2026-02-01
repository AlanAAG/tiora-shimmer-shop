import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { ShopifyProduct } from "@/lib/shopify";
interface BestsellersCarouselProps {
  title?: string;
  currentProductHandle?: string;
}

// Helper to format price from Shopify
const formatShopifyPrice = (amount: string, currencyCode: string) => {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

// Helper to get material from Shopify product
const getMaterial = (product: ShopifyProduct['node']) => {
  const variant = product.variants.edges[0]?.node;
  const materialOption = variant?.selectedOptions?.find(opt => opt.name.toLowerCase().includes('material') || opt.name.toLowerCase().includes('jewelry'));
  return materialOption?.value || '';
};
export const BestsellersCarousel = ({
  title = "Recommended Products",
  currentProductHandle
}: BestsellersCarouselProps) => {
  const {
    data: bestsellers,
    isLoading
  } = useShopifyCollection('best-sellers', 10);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true
  }, [AutoScroll({
    speed: 0.5,
    stopOnInteraction: false,
    stopOnMouseEnter: false
  })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  if (isLoading || !bestsellers?.length) return null;

  // Filter out current product
  const displayProducts = bestsellers.filter(p => p.node.handle !== currentProductHandle);
  if (displayProducts.length < 2) return null;
  return <section className="py-12 md:py-16 overflow-hidden pt-[30px]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl text-foreground">
            {title}
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="h-10 w-10 rounded-full border-border hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="h-10 w-10 rounded-full border-border hover:bg-muted">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 pl-4 md:pl-[calc((100%-72rem)/2+1.5rem)]">
          {/* Duplicate products for seamless infinite scroll */}
          {[...displayProducts, ...displayProducts].map((product, index) => {
          const node = product.node;
          const image = node.images.edges[0]?.node;
          const price = node.priceRange.minVariantPrice;
          const comparePrice = node.compareAtPriceRange?.minVariantPrice;
          const material = getMaterial(node);
          const isGold = material.toLowerCase().includes('gold');
          return <div key={`${node.id}-${index}`} className="flex-none w-[45%] md:w-[22%]">
                <Link to={`/product/${node.handle}`} className="group block">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted rounded-xl border border-accent">
                    {image && <img src={image.url} alt={image.altText || node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-display text-sm text-foreground line-clamp-1">
                      {node.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount) && <span className="font-body text-xs text-muted-foreground line-through">
                          {formatShopifyPrice(comparePrice.amount, comparePrice.currencyCode)}
                        </span>}
                      <span className="font-body text-sm font-medium text-foreground">
                        {formatShopifyPrice(price.amount, price.currencyCode)}
                      </span>
                    </div>
                    {/* Material indicator */}
                    {material && <div className="flex items-center gap-2 pt-1">
                        <span className={`w-3 h-3 rounded-full border border-border ${isGold ? "bg-amber-400" : "bg-gray-300"}`} />
                        <span className="font-body text-xs text-muted-foreground">
                          {material}
                        </span>
                      </div>}
                  </div>
                </Link>
              </div>;
        })}
        </div>
      </div>
    </section>;
};