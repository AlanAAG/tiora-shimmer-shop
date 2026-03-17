import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SHOPIFY_ACCOUNT_BASE = "https://shopify.com/94442127661";

export const ShopifyRedirect = ({ path }: { path: string }) => {
  const location = useLocation();

  useEffect(() => {
    // Preserve query string (e.g. authentication tokens from order emails)
    const queryString = location.search || "";
    window.location.href = `${SHOPIFY_ACCOUNT_BASE}${path}${queryString}`;
  }, [path, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground animate-pulse">Redirecting to your account...</p>
    </div>
  );
};

/**
 * Catches any path starting with /94442127661/ and redirects to shopify.com
 * This handles order confirmation email links that point to tiora.co
 */
export const ShopifyCatchAllRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    window.location.href = `https://shopify.com${fullPath}`;
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground animate-pulse">Redirecting to Shopify...</p>
    </div>
  );
};
