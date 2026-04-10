import { getMediaUrl, getVideoPoster } from "@/lib/cloudinary";
import { Play } from "lucide-react";

const reels = [
  { id: 1, publicId: "reel_1" },
  { id: 2, publicId: "reel_2" },
  { id: 3, publicId: "reel_3" },
  { id: 4, publicId: "reel_4" },
  { id: 5, publicId: "reel_5" },
  { id: 6, publicId: "reel_6" },
];

const ShopTrends = () => {
  return (
    <section className="pt-0 pb-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-3">
            Real Life, Real Compliments
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
            See how our pieces handle the real world. Waterproof, tarnish-resistant, and built for daily wear.
          </p>
        </div>

        {/* 6-Column Grid for Reels */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {reels.map((reel) => {
            const videoUrl = getMediaUrl(reel.publicId, "video");
            const posterUrl = getVideoPoster(reel.publicId);

            return (
              <a
                key={reel.id}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[9/16] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-muted"
              >
                {/* HTML5 Video specifically structured for mobile inline autoplay without lag */}
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={posterUrl}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>

                {/* Dark gradient overlay on hover to mimic social UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Social indicator (Play icon) */}
                <div className="absolute top-3 right-3 text-white drop-shadow-md z-10 transition-opacity duration-300">
                  <Play className="w-5 h-5 fill-white stroke-[1.5px]" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopTrends;
