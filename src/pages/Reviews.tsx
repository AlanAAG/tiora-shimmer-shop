import { useState, useMemo } from "react";
import { Star, CheckCircle, Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { customerReviews, shuffleReviews, getAverageRating, getTotalReviewCount } from "@/data/reviews";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { Helmet } from "react-helmet-async";

type CategoryFilter = "all" | "bracelets" | "earrings" | "rings";

const INITIAL_REVIEWS_COUNT = 9;

interface ProductInfo {
  handle: string;
  imageUrl: string;
  title: string;
}

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  const averageRating = getAverageRating();
  const totalReviews = getTotalReviewCount();

  // Fetch products by category
  const { data: braceletProducts = [] } = useShopifyCollection("bracelets", 20);
  const { data: earringProducts = [] } = useShopifyCollection("earrings", 20);
  const { data: ringProducts = [] } = useShopifyCollection("rings", 20);

  // Create product maps by category
  const productsByCategory = useMemo(() => {
    const mapProducts = (products: typeof braceletProducts): ProductInfo[] => 
      products.map(p => ({
        handle: p.node.handle,
        imageUrl: p.node.images.edges[0]?.node.url || "/placeholder.svg",
        title: p.node.title,
      }));

    return {
      bracelets: mapProducts(braceletProducts),
      earrings: mapProducts(earringProducts),
      rings: mapProducts(ringProducts),
    };
  }, [braceletProducts, earringProducts, ringProducts]);

  // Shuffle and filter reviews, assign products
  const displayedReviews = useMemo(() => {
    const shuffled = shuffleReviews(customerReviews);
    const filtered = activeFilter === "all" 
      ? shuffled 
      : shuffled.filter(review => review.category === activeFilter);

    // Track index per category to cycle through products
    const categoryIndices: Record<string, number> = {
      bracelets: 0,
      earrings: 0,
      rings: 0,
    };

    return filtered.map(review => {
      const categoryProducts = productsByCategory[review.category] || [];
      const idx = categoryIndices[review.category];
      const product = categoryProducts[idx % categoryProducts.length];
      categoryIndices[review.category] = idx + 1;

      return {
        ...review,
        product,
      };
    });
  }, [activeFilter, productsByCategory]);

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Bracelets", value: "bracelets" },
    { label: "Earrings", value: "earrings" },
    { label: "Rings", value: "rings" },
  ];

  // Render stars with partial fill for 4.8 rating
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starNumber = i + 1;
      let fillPercentage = 0;
      
      if (starNumber <= Math.floor(averageRating)) {
        fillPercentage = 100;
      } else if (starNumber === Math.ceil(averageRating)) {
        fillPercentage = (averageRating % 1) * 100;
      }
      
      return (
        <div key={i} className="relative w-5 h-5">
          {/* Background star (empty) */}
          <Star className="absolute w-5 h-5 text-primary/30" />
          {/* Foreground star (filled) with clip */}
          <div 
            className="absolute overflow-hidden" 
            style={{ width: `${fillPercentage}%` }}
          >
            <Star className="w-5 h-5 fill-primary text-primary" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Customer Reviews | TIORA</title>
        <meta
          name="description"
          content={`Read over ${totalReviews}+ reviews from our happy customers. See why women love TIORA's 18k gold-plated, waterproof, and tarnish-resistant jewelry.`}
        />
        <link rel="canonical" href="https://tiora.co/reviews" />
      </Helmet>
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />
      
      {/* Hero Section - Minimalistic */}
      <section className="px-4 pt-32 md:pt-36 pb-12 md:pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Over {totalReviews}+
              <br />
              reviews
            </h1>
            <p className="font-body text-muted-foreground mb-6 max-w-md">
              Real stories from our Tiora family. Every piece, every moment, crafted with care.
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {renderStars()}
              </div>
              <span className="font-body text-sm text-muted-foreground">
                {averageRating} / 5
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collapsible Filter */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4">
          <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 py-3 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                filterOpen && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex items-center gap-2 pb-4 flex-wrap">
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
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAll ? displayedReviews : displayedReviews.slice(0, INITIAL_REVIEWS_COUNT)).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="bg-card border border-border p-6 hover:shadow-lg transition-shadow"
              >
                {/* Product Image - Clickable */}
                <Link 
                  to={review.product ? `/product/${review.product.handle}` : "/shop"}
                  className="block mb-4 group"
                >
                  <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                    {review.product ? (
                      <img 
                        src={review.product.imageUrl} 
                        alt={review.product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <div className="text-center p-4">
                          <div className="w-12 h-12 mx-auto mb-2 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📷</span>
                          </div>
                          <p className="font-body text-xs tracking-wide capitalize">
                            {review.category}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Name */}
                <Link 
                  to={review.product ? `/product/${review.product.handle}` : "/shop"}
                  className="block mb-3 hover:text-primary transition-colors"
                >
                  <p className="font-display text-sm text-foreground line-clamp-1">
                    {review.product?.title || review.productType}
                  </p>
                </Link>

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
          
          {/* Read More Button */}
          {!showAll && displayedReviews.length > INITIAL_REVIEWS_COUNT && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-10"
            >
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 border border-foreground text-foreground font-body text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Read More Reviews ({displayedReviews.length - INITIAL_REVIEWS_COUNT} more)
              </button>
            </motion.div>
          )}
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
