import { Link } from "react-router-dom";
import { Loader2, ShoppingBag } from "lucide-react";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export const RecommendedCarousel = () => {
  // Fetches real Shopify data internally
  const { data: products, isLoading, error } = useShopifyCollection("frontpage", 10);
  const { addItem, isLoading: isAdding } = useCartStore();

  if (error || (!isLoading && !products?.length)) return null;

  const handleQuickAdd = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success("Added to cart", { description: product.node.title });
  };

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="font-display text-2xl md:text-3xl mb-8 italic">Recommended for You</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i} className="pl-3 md:pl-4 basis-1/2 md:basis-1/4">
                    <Skeleton className="aspect-[3/4] rounded-2xl mb-3" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CarouselItem>
                ))
              : products?.map((product) => {
                  const { node } = product;
                  const price = parseFloat(node.priceRange.minVariantPrice.amount);
                  const currency = node.priceRange.minVariantPrice.currencyCode;
                  const image = node.images.edges[0]?.node.url;
                  const isSilver = node.title.toLowerCase().includes("silver");

                  return (
                    <CarouselItem key={node.id} className="pl-3 md:pl-4 basis-1/2 md:basis-1/4">
                      <Link to={`/product/${node.handle}`} className="group block">
                        <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted rounded-2xl border border-border">
                          <img
                            src={image}
                            alt={node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            disabled={isAdding}
                            className="absolute bottom-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm border border-border rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-foreground hover:text-background"
                          >
                            {isAdding ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <ShoppingBag className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 mb-2">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border border-border ${!isSilver ? "bg-gradient-to-br from-amber-300 to-amber-500" : "bg-gradient-to-br from-gray-200 to-gray-400"}`}
                          />
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-body">
                            {isSilver ? "Silver Plated" : "18k Gold Plated"}
                          </span>
                        </div>

                        <h3 className="font-display text-sm text-foreground mb-1 line-clamp-1">{node.title}</h3>
                        <p className="font-body text-sm font-medium text-foreground">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(price)}
                        </p>
                      </Link>
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-background/80" />
          <CarouselNext className="hidden md:flex -right-4 bg-background/80" />
        </Carousel>
      </div>
    </section>
  );
};
