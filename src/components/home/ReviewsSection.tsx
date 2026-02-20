import { useState, useRef, useEffect } from "react";
import { Star, Play, X, CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { Link } from "react-router-dom";
import { getMediaUrl } from "@/lib/cloudinary";

const reviewVideo1 = {
  src: getMediaUrl("homepage/reviews/home-reviews-review-1.mp4", "video"),
  poster: getMediaUrl("homepage/reviews/home-reviews-review-1.mp4", "image")
};
const reviewVideo2 = {
  src: getMediaUrl("homepage/reviews/home-reviews-review-2.mp4", "video"),
  poster: getMediaUrl("homepage/reviews/home-reviews-review-2.mp4", "image")
};
const reviewVideo3 = {
  src: getMediaUrl("homepage/reviews/home-reviews-review-3.mp4", "video"),
  poster: getMediaUrl("homepage/reviews/home-reviews-review-3.mp4", "image")
};

const reviews = [
  {
    id: 1,
    name: "Priya",
    review: "SO Cute and beautiful. Im really impressed with these. I stepped out if my comfort zone and really loved what i got out if it!",
    verified: true,
  },
  {
    id: 2,
    name: "Ananya",
    review: "Been eyeing this piece for months. Glad I finally went for it... it does NOT disappoint!",
    verified: true,
  },
  {
    id: 3,
    name: "Meera",
    review: "Obsessed! I work in the jewelry industry and I'm very picky about quality. Their silver color is beautiful & bright. Even their packaging is great!",
    verified: true,
  },
];

interface ProductData {
  handle: string;
  imageUrl: string;
  title: string;
}

interface VideoData {
  src: string;
  poster?: string;
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

const VideoCard = ({ 
  video, 
  product, 
  onClick,
  sectionRef 
}: { 
  video?: VideoData;
  product?: ProductData; 
  onClick: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video?.src || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [video?.src, sectionRef]);

  if (video?.src) {
    return (
      <button
        onClick={onClick}
        className="relative w-full aspect-square rounded-xl bg-muted overflow-hidden group"
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-end p-4 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-foreground ml-0.5 fill-foreground" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-square rounded-xl bg-muted overflow-hidden group"
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
};

const MobileVideoCircle = ({ 
  video, 
  product, 
  onClick,
  sectionRef 
}: { 
  video?: VideoData;
  product?: ProductData; 
  onClick: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video?.src || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [video?.src, sectionRef]);

  if (video?.src) {
    return (
      <button
        onClick={onClick}
        className="relative w-28 h-28 rounded-full bg-muted overflow-hidden group border-2 border-foreground/30"
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 group-hover:bg-foreground/20 transition-colors rounded-full">
          <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-foreground ml-0.5 fill-foreground" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <Link
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
  );
};

const ReviewsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { data: products = [] } = useShopifyCollection("all-items", 6);

  // Video sources - all three review videos
  const videoSources: VideoData[] = [
    reviewVideo1,
    reviewVideo2,
    reviewVideo3,
  ];

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

  const handleVideoClick = (videoSrc?: string) => {
    if (videoSrc) {
      setSelectedVideo(videoSrc);
    }
  };

  return (
    <section ref={sectionRef} className="py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Beige container for tablet/desktop */}
        <div className="md:bg-[hsl(35,30%,95%)] md:rounded-2xl md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-2">
              115+ Five Star Reviews
            </h2>
          </div>

          {/* Mobile Layout - Circular videos + review cards */}
          <div className="md:hidden">
            {/* Video Reviews - Circular */}
            <div className="flex justify-center gap-3 mb-10">
              {videoProducts.map((product, idx) => (
                <MobileVideoCircle
                  key={idx}
                  video={videoSources[idx]}
                  product={product}
                  onClick={() => handleVideoClick(videoSources[idx]?.src)}
                  sectionRef={sectionRef}
                />
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
            <VideoCard 
              video={videoSources[0]} 
              product={videoProducts[0]} 
              onClick={() => handleVideoClick(videoSources[0]?.src)} 
              sectionRef={sectionRef}
            />
            <ReviewCard review={reviews[1]} product={reviewProducts[1]} />
            
            {/* Row 2: Video, Review, Video */}
            <VideoCard 
              video={videoSources[1]} 
              product={videoProducts[1]} 
              onClick={() => handleVideoClick(videoSources[1]?.src)} 
              sectionRef={sectionRef}
            />
            <ReviewCard review={reviews[2]} product={reviewProducts[2]} />
            <VideoCard 
              video={videoSources[2]} 
              product={videoProducts[2]} 
              onClick={() => handleVideoClick(videoSources[2]?.src)} 
              sectionRef={sectionRef}
            />
          </div>
        </div>

        {/* Video Dialog - Fullscreen with 1:1 aspect ratio */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-[90vmin] w-full p-0 bg-black border-none">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-square bg-black flex items-center justify-center">
              {selectedVideo && (
                <video
                  src={selectedVideo}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ReviewsSection;
