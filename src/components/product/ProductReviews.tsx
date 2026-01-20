import { Star } from "lucide-react";
import { Review, Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductReviewsProps {
  reviews: Review[];
  product: Product;
}

export const ProductReviews = ({ reviews, product }: ProductReviewsProps) => {
  const averageRating = product.rating;

  return (
    <section id="reviews-section" className="py-16 bg-secondary/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Customer Reviews
          </h2>
          
          {/* Average Rating */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : i < averageRating
                      ? "fill-amber-400/50 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="font-body text-lg text-foreground">
              {averageRating.toFixed(1)} out of 5
            </span>
            <span className="text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card p-6 border border-border rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                {review.verified && (
                  <span className="text-[10px] text-primary font-body tracking-wide uppercase">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              <h4 className="font-display text-lg text-foreground mb-2">
                {review.title}
              </h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                {review.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{review.author}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            Write a Review
          </Button>
        </div>
      </div>
    </section>
  );
};
