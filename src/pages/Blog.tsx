import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Badge } from "@/components/ui/badge";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blogPosts";
import { getMediaUrl } from "@/lib/cloudinary";
import { ArrowRight, Clock, Calendar } from "lucide-react";

// Helper for dynamic colors
const categoryColors: Record<BlogCategory, string> = {
  "Skin Sensitivity": "bg-rose-50 text-rose-700 border-rose-200",
  "Materials & Quality": "bg-amber-50 text-amber-700 border-amber-200",
  "Everyday Wear": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Buying Guides": "bg-sky-50 text-sky-700 border-sky-200",
};

// Map Categories to nice fallback images since they don't have images hardcoded
const fallbackImages: Record<BlogCategory, string> = {
  "Skin Sensitivity": getMediaUrl("home-trends-molten-flow", "image"),
  "Materials & Quality": getMediaUrl("home-trends-sculptural-gold", "image"),
  "Everyday Wear": getMediaUrl("home-trends-hammered-gold", "image"),
  "Buying Guides": getMediaUrl("home-trends-architectural-gold", "image"),
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Journal | Tiora" 
        description="Style guides, care instructions, and the world of demi-fine jewellery." 
      />
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />

      <main className="pt-24 pb-20 px-4 md:px-8 lg:px-16 mx-auto max-w-7xl">
        {/* Header Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            The Journal
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Style guides, care instructions, and the world of demi-fine jewellery.
          </p>
        </section>

        {/* Filters */}
        <section className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("All")}
            className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all ${
              activeCategory === "All"
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
            }`}
          >
            All Articles
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Featured Post (First one when filtered) */}
        {activeCategory === "All" && filteredPosts.length > 0 && (
          <div className="mb-16">
            <Link to={`/journal/${filteredPosts[0].slug}`} className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border bg-card">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 h-full">
                <div className="lg:col-span-3 aspect-video md:aspect-auto overflow-hidden bg-muted">
                  <img 
                    src={filteredPosts[0].image || fallbackImages[filteredPosts[0].category]} 
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-card">
                  <Badge variant="outline" className={`w-fit mb-4 ${categoryColors[filteredPosts[0].category]}`}>
                    {filteredPosts[0].category}
                  </Badge>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(filteredPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                      <Clock className="w-3.5 h-3.5" />
                      {filteredPosts[0].readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid of remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts).map((post) => (
            <Link 
              key={post.slug} 
              to={`/journal/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={post.image || fallbackImages[post.category]} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <Badge variant="outline" className={`w-fit mb-4 ${categoryColors[post.category]}`}>
                  {post.category}
                </Badge>
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground font-body">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-primary font-medium group-hover:underline">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
