import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SHOPIFY_ACCOUNT_BASE = "https://shopify.com/94442127661";

const getShopifyUrl = (path: string, queryString = "") => {
  if (path.startsWith("/authentication/")) {
    return `https://shopify.com${path}${queryString}`;
  }

  return `${SHOPIFY_ACCOUNT_BASE}${path}${queryString}`;
};

export const ShopifyRedirect = ({ path }: { path: string }) => {
  const location = useLocation();

  useEffect(() => {
    const queryString = location.search || "";
    window.location.replace(getShopifyUrl(path, queryString));
  }, [path, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground animate-pulse">Redirecting to your account...</p>
    </div>
  );
};

/**
 * Catches Shopify-generated auth, order, and account paths on the storefront domain
 * and forwards them to Shopify while preserving the full path and query string.
 */
export const ShopifyCatchAllRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search}`;
    window.location.replace(`https://shopify.com${fullPath}`);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground animate-pulse">Redirecting to Shopify...</p>
    </div>
  );
};
