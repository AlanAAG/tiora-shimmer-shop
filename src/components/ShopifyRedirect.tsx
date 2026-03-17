import { useEffect } from "react";

const SHOPIFY_ACCOUNT_BASE = "https://shopify.com/94442127661";

export const ShopifyRedirect = ({ path }: { path: string }) => {
  useEffect(() => {
    window.location.href = `${SHOPIFY_ACCOUNT_BASE}${path}`;
  }, [path]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground animate-pulse">Redirecting to your account...</p>
    </div>
  );
};
