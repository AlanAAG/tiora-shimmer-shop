import { useState, useMemo } from "react";
import { Star, CheckCircle, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { customerReviews, shuffleReviews, getAverageRating, getTotalReviewCount } from "@/data/reviews";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CategoryFilter = "all" | "bracelets" | "earrings" | "rings";

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviewCount();

  // Shuffle and filter reviews
  const displayedReviews = useMemo(() => {
    const shuffled = shuffleReviews(customerReviews);
    if (activeFilter === "all") return shuffled;
    return shuffled.filter(review => review.category === activeFilter);
  }, [activeFilter]);

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Bracelets", value: "bracelets" },
    { label: "Earrings", value: "earrings" },
    { label: "Rings", value: "rings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground mb-4">
              Customer Reviews
            </h1>
            <p className="font-body text-primary-foreground/80 mb-8">
              Real stories from our Tiora family
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-6 h-6",
                      i < Math.floor(averageRating)
                        ? "fill-primary-foreground text-primary-foreground"
                        : "text-primary-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="font-display text-2xl text-primary-foreground">
                {averageRating} / 5
              </span>
              <span className="text-primary-foreground/70 font-body">
                ({totalReviews}+ reviews)
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-40 bg-background border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 py-2 rounded-full font-body text-sm transition-all",
                  activeFilter === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="bg-card border border-border p-6 hover:shadow-lg transition-shadow"
              >
                {/* Product Image Placeholder - Clickable */}
                <Link 
                  to={review.productSlug ? `/product/${review.productSlug}` : "/shop"}
                  className="block mb-4 group"
                >
                  <div className="aspect-square bg-muted rounded-sm flex items-center justify-center overflow-hidden group-hover:bg-accent transition-colors">
                    <div className="text-center text-muted-foreground p-4">
                      <div className="w-12 h-12 mx-auto mb-2 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center group-hover:border-primary/50 transition-colors">
                        <span className="text-lg">📷</span>
                      </div>
                      <p className="font-body text-xs tracking-wide capitalize">
                        {review.category}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Product Type */}
                <p className="text-xs text-muted-foreground font-body mb-2 uppercase tracking-wide">
                  {review.productType}
                </p>

                {/* Rating - Green Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-lg text-foreground mb-2">
                  {review.title}
                </h3>

                {/* Content */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  "{review.content}"
                </p>

                {/* Author & Verified */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-foreground">
                      {review.author}
                    </span>
                    {review.location && (
                      <span className="text-muted-foreground text-sm ml-1">
                        , {review.location}
                      </span>
                    )}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-primary font-body">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Join Our Happy Customers
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Experience the Tiora difference for yourself
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-body hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
