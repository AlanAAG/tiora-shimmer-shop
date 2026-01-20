import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import CareGuide from "./pages/CareGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/help" element={<CareGuide />} />
      <Route path="/care-guide" element={<CareGuide />} />
      <Route path="/earrings" element={<Shop />} />
      <Route path="/bracelets" element={<Shop />} />
      <Route path="/necklaces" element={<Shop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
