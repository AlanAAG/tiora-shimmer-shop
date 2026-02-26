import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  // Find related posts in same category (max 3, excluding current)
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Convert markdown-like content to safe HTML (basic)
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, i) => {
        // Internal links
        const linkRegex = /\[(.+?)\]\((.+?)\)/g;
        const processLinks = (text: string) => {
          const parts: (string | JSX.Element)[] = [];
          let lastIndex = 0;
          let match;
          while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
              parts.push(text.slice(lastIndex, match.index));
            }
            parts.push(
              <Link
                key={match.index}
                to={match[2]}
                className="text-primary underline hover:text-primary/80 transition-colors font-semibold"
              >
                {match[1]}
              </Link>
            );
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < text.length) parts.push(text.slice(lastIndex));
          return parts;
        };

        // Bold
        const processBold = (text: string) => {
          const boldParts = text.split(/\*\*(.+?)\*\*/g);
          return boldParts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          );
        };

        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="font-display text-2xl md:text-3xl mt-10 mb-4">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="font-display text-xl md:text-2xl mt-6 mb-3">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("- **")) {
          const content = line.replace("- ", "");
          return (
            <li key={i} className="ml-5 mb-2 font-body text-sm md:text-base text-muted-foreground leading-relaxed list-disc">
              {processBold(content)}
            </li>
          );
        }
        if (line.startsWith("- ")) {
          const content = line.replace("- ", "");
          return (
            <li key={i} className="ml-5 mb-2 font-body text-sm md:text-base text-muted-foreground leading-relaxed list-disc">
              {processLinks(content).length > 1 ? processLinks(content) : processBold(content)}
            </li>
          );
        }
        if (line.startsWith("- [ ]")) {
          return (
            <li key={i} className="ml-5 mb-2 font-body text-sm md:text-base text-muted-foreground leading-relaxed list-none flex items-center gap-2">
              <span className="w-4 h-4 border border-border rounded inline-block flex-shrink-0" />
              {line.replace("- [ ] ", "")}
            </li>
          );
        }
        if (line.startsWith("|")) {
          // Skip table rows for simplicity—render as plain text
          return (
            <p key={i} className="font-body text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded">
              {line}
            </p>
          );
        }
        if (line.startsWith("1. ") || /^\d+\.\s/.test(line)) {
          return (
            <li key={i} className="ml-5 mb-2 font-body text-sm md:text-base text-muted-foreground leading-relaxed list-decimal">
              {processBold(line.replace(/^\d+\.\s/, ""))}
            </li>
          );
        }
        // Links in paragraphs
        if (line.includes("[") && line.includes("](")) {
          return (
            <p key={i} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              {processLinks(line)}
            </p>
          );
        }
        return (
          <p key={i} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            {processBold(line)}
          </p>
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | TIORA Journal</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              name: "TIORA",
              url: "https://tiora.co",
            },
          })}
        </script>
      </Helmet>
      <DiscountBanner />
      <Header />

      <main className="min-h-screen">
        {/* Back + Meta */}
        <div className="container mx-auto px-6 pt-8 md:pt-12 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-5xl mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-6 max-w-3xl pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {renderContent(post.content)}
          </motion.div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="border-t border-border py-12 md:py-16">
            <div className="container mx-auto px-6">
              <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
                Continue Reading
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group block"
                  >
                    <article className="border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-card transition-all h-full flex flex-col">
                      <h3 className="font-display text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                        {rp.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                        {rp.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-primary font-body mt-3 pt-3 border-t border-border group-hover:gap-2 transition-all">
                        Read article <ArrowLeft className="w-3 h-3 rotate-180" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default BlogArticle;
