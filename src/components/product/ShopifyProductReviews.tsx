import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { customerReviews, CustomerReview } from "@/data/reviews";

interface ShopifyProductReviewsProps {
  productTitle: string;
  productHandle: string;
}

// Helper to determine product category from title
const getCategoryFromTitle = (title: string): "bracelets" | "earrings" | "rings" | null => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("bracelet") || lowerTitle.includes("cuff") || lowerTitle.includes("bangle")) {
    return "bracelets";
  }
  if (lowerTitle.includes("earring") || lowerTitle.includes("hoop") || lowerTitle.includes("stud") || lowerTitle.includes("drop")) {
    return "earrings";
  }
  if (lowerTitle.includes("ring") || lowerTitle.includes("band")) {
    return "rings";
  }
  
  return null;
};

// Helper to match reviews to product
const getMatchingReviews = (productTitle: string, productHandle: string): CustomerReview[] => {
  const lowerTitle = productTitle.toLowerCase();
  const category = getCategoryFromTitle(productTitle);
  
  // First, try to find reviews with matching productSlug
  const slugMatches = customerReviews.filter(r => r.productSlug === productHandle);
  if (slugMatches.length > 0) {
    return slugMatches.slice(0, 4);
  }
  
  // Then, find reviews in the same category with matching keywords
  const categoryReviews = category 
    ? customerReviews.filter(r => r.category === category)
    : customerReviews;
  
  // Score reviews by relevance
  const scoredReviews = categoryReviews.map(review => {
    let score = 0;
    const reviewType = review.productType.toLowerCase();
    
    // Check for keyword matches
    const titleWords = lowerTitle.split(/\s+/);
    titleWords.forEach(word => {
      if (word.length > 3 && reviewType.includes(word)) {
        score += 2;
      }
    });
    
    // Boost for specific matches
    if (lowerTitle.includes("hoop") && reviewType.includes("hoop")) score += 3;
    if (lowerTitle.includes("cuff") && reviewType.includes("cuff")) score += 3;
    if (lowerTitle.includes("bangle") && reviewType.includes("bangle")) score += 3;
    if (lowerTitle.includes("stud") && reviewType.includes("stud")) score += 3;
    if (lowerTitle.includes("drop") && reviewType.includes("drop")) score += 3;
    if (lowerTitle.includes("huggies") && reviewType.includes("huggies")) score += 3;
    if (lowerTitle.includes("textured") && reviewType.includes("textured")) score += 2;
    if (lowerTitle.includes("gold") && reviewType.includes("gold")) score += 1;
    if (lowerTitle.includes("silver") && reviewType.includes("silver")) score += 1;
    if (lowerTitle.includes("molten") && (reviewType.includes("liquid") || reviewType.includes("molten"))) score += 2;
    if (lowerTitle.includes("hammered") && reviewType.includes("hammered")) score += 2;
    if (lowerTitle.includes("wave") && reviewType.includes("wave")) score += 2;
    
    return { review, score };
  });
  
  // Sort by score and take top matches
  const sortedReviews = scoredReviews
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.review);
  
  // If we have matches, return them
  if (sortedReviews.length > 0) {
    return sortedReviews.slice(0, 4);
  }
  
  // Fallback: return random reviews from the same category
  if (category) {
    const categoryFiltered = customerReviews.filter(r => r.category === category);
    return categoryFiltered.slice(0, 4);
  }
  
  // Last resort: return first 4 reviews
  return customerReviews.slice(0, 4);
};

export const ShopifyProductReviews = ({ productTitle, productHandle }: ShopifyProductReviewsProps) => {
  const matchingReviews = getMatchingReviews(productTitle, productHandle);
  
  if (matchingReviews.length === 0) {
    return null;
  }
  
  const averageRating = matchingReviews.reduce((sum, r) => sum + r.rating, 0) / matchingReviews.length;

  return (
    <section id="reviews-section" className="py-16 bg-secondary/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            What Customers Say
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
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {matchingReviews.map((review) => (
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
                {review.location && <span>{review.location}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center mt-10">
          <Link to="/reviews">
            <Button variant="outline" size="lg">
              View All Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
