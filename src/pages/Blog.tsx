import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Badge } from "@/components/ui/badge";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blogPosts";

const categoryColors: Record<BlogCategory, string> = {
  "Skin Sensitivity": "bg-rose-50 text-rose-700 border-rose-200",
  "Materials & Quality": "bg-amber-50 text-amber-700 border-amber-200",
  "Everyday Wear": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Buying Guides": "bg-sky-50 text-sky-700 border-sky-200",
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Jewelry Journal — Expert Guides & Insights | TIORA</title>
        <meta
          name="description"
          content="Expert jewelry guides on materials, skin sensitivity, everyday wear, and buying advice. Learn about 18K gold plating, hypoallergenic metals, and how to choose jewelry that lasts."
        />
      </Helmet>
      <DiscountBanner />
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-xs tracking-[0.3em] uppercase mb-4 text-primary-foreground/70"
            >
              The Tiora Journal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl italic mb-4"
            >
              Jewelry Knowledge,{" "}
              <span className="not-italic">Simplified</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-sm md:text-base text-primary-foreground/80 max-w-lg mx-auto"
            >
              Expert guides on materials, skin safety, everyday wear, and
              choosing jewelry that truly lasts.
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-30">
          <div className="container mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory("All")}
              className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              All Articles
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            {/* Featured (first article) */}
            {activeCategory === "All" && filtered.length > 0 && (
              <Link
                to={`/blog/${filtered[0].slug}`}
                className="block mb-12 group"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary/40 rounded-lg p-8 md:p-12 hover:bg-secondary/60 transition-colors"
                >
                  <div className="max-w-2xl">
                    <Badge
                      variant="outline"
                      className={`mb-4 ${categoryColors[filtered[0].category]}`}
                    >
                      {filtered[0].category}
                    </Badge>
                    <h2 className="font-display text-2xl md:text-4xl mb-3 group-hover:text-primary transition-colors">
                      {filtered[0].title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                      {filtered[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {filtered[0].readingTime} min read
                      </span>
                      <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === "All" ? filtered.slice(1) : filtered).map(
                (post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block h-full"
                    >
                      <article className="h-full border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-card transition-all flex flex-col">
                        <Badge
                          variant="outline"
                          className={`mb-3 w-fit ${categoryColors[post.category]}`}
                        >
                          {post.category}
                        </Badge>
                        <h3 className="font-display text-lg md:text-xl mb-2 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-body mt-auto pt-4 border-t border-border">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} min read
                          </span>
                          <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                )
              )}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground font-body py-16">
                No articles in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
