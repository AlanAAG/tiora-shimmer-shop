import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useCartSync } from "@/hooks/useCartSync";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import CareGuide from "./pages/CareGuide";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import CartRedirect from "./pages/CartRedirect";
import { ShopifyRedirect, ShopifyCatchAllRedirect } from "./components/ShopifyRedirect";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  const location = useLocation();

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://tiora.co${location.pathname}`} />
      </Helmet>
      <ScrollToTop />
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/bracelets" element={<Navigate to="/shop/bracelets" replace />} />
        <Route path="/necklaces" element={<Navigate to="/shop/necklaces" replace />} />
        <Route path="/cart" element={<CartRedirect />} />
        {/* Hosted Shopify customer account routes */}
        <Route path="/login" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
        <Route path="/signup" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
        <Route path="/account" element={<ShopifyRedirect path="/account" />} />
        <Route path="/update-password" element={<ShopifyRedirect path="/authentication/94442127661/login" />} />
        {/* Catch-all for Shopify auth/order/account paths from confirmation emails */}
        <Route path="/authentication/94442127661/*" element={<ShopifyCatchAllRedirect />} />
        <Route path="/94442127661/*" element={<ShopifyCatchAllRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
