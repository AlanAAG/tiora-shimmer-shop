import { useState } from "react";
import { Star, Play, X, CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Jacki",
    review: "SO Cute and beautiful. Im really impressed with these. I stepped out if my comfort zone and really loved what i got out if it!",
    verified: true,
  },
  {
    id: 2,
    name: "Natasha",
    review: "Been eyeing this piece for months. Glad I finally went for it... it does NOT disappoint!",
    verified: true,
  },
  {
    id: 3,
    name: "Kristine",
    review: "Obsessed! I work in the jewelry industry and I'm very picky about quality. Their silver color is beautiful & bright. Even their packaging is great!",
    verified: true,
  },
];

interface ProductData {
  handle: string;
  imageUrl: string;
  title: string;
}

const ReviewCard = ({ review, product }: { review: typeof reviews[0]; product?: ProductData }) => (
  <Link 
    to={product ? `/product/${product.handle}` : "#"}
    className="bg-card p-4 md:p-5 rounded-xl border border-border h-full flex flex-col md:aspect-square overflow-hidden hover:border-primary/50 transition-colors"
  >
    {/* Stars */}
    <div className="flex gap-0.5 mb-3 shrink-0">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 md:w-4 md:h-4 fill-destructive text-destructive"
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="font-body text-sm md:text-base text-foreground/80 italic leading-relaxed mb-3 flex-1 font-semibold line-clamp-5 md:line-clamp-4 overflow-hidden">
      "{review.review}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-2 shrink-0">
      <span className="font-display text-base md:text-lg text-foreground truncate">
        {review.name}
      </span>
      {review.verified && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          Verified Buyer
        </span>
      )}
    </div>
  </Link>
);

const VideoCard = ({ product, onClick }: { product?: ProductData; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative w-full aspect-[3/4] md:aspect-square rounded-xl bg-muted overflow-hidden group"
  >
    <img
      src={product?.imageUrl || "/placeholder.svg"}
      alt={product?.title || "Video review"}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex items-end justify-end p-4 bg-gradient-to-t from-foreground/20 to-transparent">
      <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
        <Play className="w-5 h-5 text-foreground ml-0.5 fill-foreground" />
      </div>
    </div>
  </button>
);

const ReviewsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { data: products = [] } = useShopifyCollection("all-items", 6);

  // Map products to review/video cards
  const productData: ProductData[] = products.map((p) => ({
    handle: p.node.handle,
    imageUrl: p.node.images.edges[0]?.node.url || "/placeholder.svg",
    title: p.node.title,
  }));

  // Grid layout: review, video, review / video, review, video
  // Assign products: 0,2,4 for reviews; 1,3,5 for videos
  const reviewProducts = [productData[0], productData[2], productData[4]];
  const videoProducts = [productData[1], productData[3], productData[5]];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Beige container for tablet/desktop */}
        <div className="md:bg-[hsl(35,30%,95%)] md:rounded-2xl md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-2">
              23,513+ Five Star Reviews
            </h2>
          </div>

          {/* Mobile Layout - Circular videos + review cards */}
          <div className="md:hidden">
            {/* Video Reviews - Circular */}
            <div className="flex justify-center gap-3 mb-10">
              {videoProducts.map((product, idx) => (
                <Link
                  key={idx}
                  to={product ? `/product/${product.handle}` : "#"}
                  className="relative w-28 h-28 rounded-full bg-muted overflow-hidden group border-2 border-foreground/30"
                >
                  <img
                    src={product?.imageUrl || "/placeholder.svg"}
                    alt={product?.title || "Video review"}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 group-hover:bg-foreground/20 transition-colors rounded-full">
                    <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-foreground ml-0.5 fill-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Written Reviews */}
            <div className="grid grid-cols-1 gap-4 px-1">
              {reviews.map((review, idx) => (
                <ReviewCard key={review.id} review={review} product={reviewProducts[idx]} />
              ))}
            </div>
          </div>

          {/* Tablet/Desktop Layout - 3x2 Grid with alternating video/review */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {/* Row 1: Review, Video, Review */}
            <ReviewCard review={reviews[0]} product={reviewProducts[0]} />
            <VideoCard product={videoProducts[0]} onClick={() => setSelectedVideo("#")} />
            <ReviewCard review={reviews[1]} product={reviewProducts[1]} />
            
            {/* Row 2: Video, Review, Video */}
            <VideoCard product={videoProducts[1]} onClick={() => setSelectedVideo("#")} />
            <ReviewCard review={reviews[2]} product={reviewProducts[2]} />
            <VideoCard product={videoProducts[2]} onClick={() => setSelectedVideo("#")} />
          </div>
        </div>

        {/* Video Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-lg p-0 bg-black border-none">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[9/16] bg-black flex items-center justify-center">
              <p className="text-white/50">Video Player</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ReviewsSection;
