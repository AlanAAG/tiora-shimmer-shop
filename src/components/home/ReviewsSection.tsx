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
    name: "Priya",
    review: "The price is so good for this quality! I was expecting something cheap but this is real gold plated. Very happy with my purchase!",
    verified: true,
  },
  {
    id: 2,
    name: "Ananya",
    review: "I thought it would be immitation jewellery but when I received it I was shock! The quality is amzing, feels like real gold. My friends are asking where I got it from!",
    verified: true,
  },
  {
    id: 3,
    name: "Meera",
    review: "Love love love the design! I search everywhere for something like this and finally found it here. The packaging also very nice, perfect for gift giving.",
    verified: true,
  },
];

const ReviewsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-12 px-2 bg-muted/20">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-2">
            23,515+ Five Star Reviews
          </h2>
        </div>

        {/* Video Reviews - Fully Circular */}
        <div className="flex justify-center gap-3 md:gap-6 mb-10">
          {videoReviews.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video.videoUrl)}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-muted overflow-hidden group border-2 border-foreground/30"
            >
              <img
                src={video.thumbnail}
                alt="Video review"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 group-hover:bg-foreground/20 transition-colors rounded-full">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/90 flex items-center justify-center">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-foreground ml-0.5 fill-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Written Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card p-6 rounded-sm border border-border"
            >
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
              <p className="font-body text-sm text-foreground/80 italic leading-relaxed mb-4">
                "{review.review}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-foreground">
                  {review.name}
                </span>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
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
