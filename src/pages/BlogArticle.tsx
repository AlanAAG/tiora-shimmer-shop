import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscountBanner from "@/components/home/DiscountBanner";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";
import { getMediaUrl } from "@/lib/cloudinary";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

// Fallbacks for category images
const fallbackImages: Record<string, string> = {
  "Skin Sensitivity": getMediaUrl("home-trends-molten-flow", "image"),
  "Materials & Quality": getMediaUrl("home-trends-sculptural-gold", "image"),
  "Everyday Wear": getMediaUrl("home-trends-hammered-gold", "image"),
  "Buying Guides": getMediaUrl("home-trends-architectural-gold", "image"),
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogPosts.find((p) => p.slug === slug);

  // Graceful 404
  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title="Article Not Found | Tiora" description="We couldn't find the article you were looking for." />
        <div className="fixed top-0 left-0 right-0 z-50">
          <DiscountBanner />
        </div>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
          <h1 className="font-display text-4xl text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The journal entry you are looking for does not exist or has been moved.</p>
          <Link 
            to="/journal" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const featuredImage = article.image || fallbackImages[article.category];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={`${article.title} | Tiora Journal`} 
        description={article.excerpt}
        image={featuredImage}
      />
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <DiscountBanner />
      </div>
      <Header />

      <main className="pt-24 pb-20 px-4 md:px-8 mx-auto max-w-4xl w-full flex-1">
        
        {/* Navigation & Metadata Header */}
        <div className="mb-10">
          <Link 
            to="/journal" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <div className="flex flex-col items-center justify-center text-center">
            <Badge variant="outline" className="mb-6 uppercase tracking-widest text-xs">
              {article.category}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-body">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-sm border border-border bg-muted">
          <img 
            src={featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Markdown Content rendered with Tailwind Typography */}
        <article className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-normal prose-p:font-body prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-xl">
          <ReactMarkdown>
            {article.content}
          </ReactMarkdown>
        </article>

      </main>
      
      <Footer />
    </div>
  );
};

export default BlogArticle;
