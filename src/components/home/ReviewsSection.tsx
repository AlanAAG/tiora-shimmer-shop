import { useState } from "react";
import { Star, Play, X, CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const videoReviews = [
  { id: 1, thumbnail: "/placeholder.svg", videoUrl: "#" },
  { id: 2, thumbnail: "/placeholder.svg", videoUrl: "#" },
  { id: 3, thumbnail: "/placeholder.svg", videoUrl: "#" },
];

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

// Grid items for desktop layout: video, review, video / review, video, review
type GridItem = 
  | { type: 'video'; data: typeof videoReviews[0] }
  | { type: 'review'; data: typeof reviews[0] };

const desktopGridItems: GridItem[] = [
  { type: 'review', data: reviews[0] },
  { type: 'video', data: videoReviews[0] },
  { type: 'review', data: reviews[1] },
  { type: 'video', data: videoReviews[1] },
  { type: 'review', data: reviews[2] },
  { type: 'video', data: videoReviews[2] },
];

const ReviewCard = ({ review, onVideoClick }: { review: typeof reviews[0]; onVideoClick?: never }) => (
  <div className="bg-card p-6 rounded-xl border border-border h-full flex flex-col md:aspect-square">
    {/* Stars */}
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-destructive text-destructive"
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="font-body text-sm md:text-base text-foreground/80 italic leading-relaxed mb-4 flex-1 font-semibold">
      "{review.review}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-2">
      <span className="font-display text-lg text-foreground">
        {review.name}
      </span>
      {review.verified && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          Verified Buyer
        </span>
      )}
    </div>
  </div>
);

const VideoCard = ({ video, onClick }: { video: typeof videoReviews[0]; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative w-full aspect-[3/4] md:aspect-square rounded-xl bg-muted overflow-hidden group"
  >
    <img
      src={video.thumbnail}
      alt="Video review"
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
            {videoReviews.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video.videoUrl)}
                className="relative w-28 h-28 rounded-full bg-muted overflow-hidden group border-2 border-foreground/30"
              >
                <img
                  src={video.thumbnail}
                  alt="Video review"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 group-hover:bg-foreground/20 transition-colors rounded-full">
                  <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-foreground ml-0.5 fill-foreground" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Written Reviews */}
          <div className="grid grid-cols-1 gap-4 px-1">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

          {/* Tablet/Desktop Layout - 3x2 Grid with alternating video/review */}
          <div className="hidden md:grid grid-cols-3 gap-5">
            {desktopGridItems.map((item, index) => (
              <div key={index} className="h-full">
                {item.type === 'video' ? (
                  <VideoCard 
                    video={item.data as typeof videoReviews[0]} 
                    onClick={() => setSelectedVideo((item.data as typeof videoReviews[0]).videoUrl)} 
                  />
                ) : (
                  <ReviewCard review={item.data as typeof reviews[0]} />
                )}
              </div>
            ))}
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
