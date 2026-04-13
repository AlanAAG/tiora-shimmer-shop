import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useCartSync } from "@/hooks/useCartSync";
import { trackPageView } from "@/lib/metaPixel";
import ScrollToTop from "@/components/ScrollToTop";
import CartRedirect from "./pages/CartRedirect";
import { ShopifyRedirect, ShopifyCatchAllRedirect } from "./components/ShopifyRedirect";

const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const About = lazy(() => import("./pages/About"));
const Reviews = lazy(() => import("./pages/Reviews"));
const CareGuide = lazy(() => import("./pages/CareGuide"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  const location = useLocation();

  // Fire Meta Pixel PageView on every SPA route change
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://tiora.co${location.pathname}`} />
      </Helmet>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-muted-foreground animate-spin" /></div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:collection" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/help" element={<FAQ />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/journal/:slug" element={<BlogArticle />} />
          <Route path="/bracelets" element={<Navigate to="/shop/bracelets" replace />} />
          <Route path="/necklaces" element={<Navigate to="/shop/necklaces" replace />} />
          <Route path="/cart" element={<CartRedirect />} />
          {/* Hosted Shopify customer account routes */}
          <Route path="/login" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
          <Route path="/signup" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
          <Route path="/account" element={<ShopifyRedirect path="/account" />} />
          <Route path="/account/*" element={<ShopifyCatchAllRedirect />} />
          <Route path="/update-password" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
          {/* Catch-all for Shopify auth/order/account paths from confirmation emails */}
          <Route path="/authentication/94442127661/*" element={<ShopifyCatchAllRedirect />} />
          <Route path="/94442127661/*" element={<ShopifyCatchAllRedirect />} />
          <Route path="/customer_authentication/*" element={<ShopifyCatchAllRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
