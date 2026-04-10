import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import SEO from "@/components/SEO";
import { Loader2 } from "lucide-react";

const CartRedirect = () => {
  const { getCheckoutUrl, items } = useCartStore();

  useEffect(() => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      // Log the checkout URL to assist in debugging future domain mismatches
      console.log("CartRedirect: Redirecting to checkout URL:", checkoutUrl);
      window.location.href = checkoutUrl;
    }
  }, [getCheckoutUrl]);

  const checkoutUrl = getCheckoutUrl();

  if (!checkoutUrl || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <SEO title="Cart | TIORA" description="Your cart is empty." />
        <p className="text-muted-foreground font-body">Your cart is empty</p>
        <a href="/shop" className="text-primary underline font-body">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <SEO title="Redirecting to Checkout | TIORA" description="Redirecting to secure Shopify checkout..." />
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground font-body">Redirecting to checkout...</p>
    </div>
  );
};

export default CartRedirect;
