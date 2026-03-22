import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const POPUP_DISMISSED_KEY = "tiora_email_popup_dismissed";
const DISCOUNT_CODE = "WELCOME15";

const EmailPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setOpen(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert({ email: email.trim().toLowerCase(), discount_code: DISCOUNT_CODE });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed! Use code WELCOME15 at checkout.");
        } else {
          throw error;
        }
      }

      setIsSuccess(true);
      localStorage.setItem(POPUP_DISMISSED_KEY, "true");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogContent className="sm:max-w-md p-0 gap-0 border-border bg-background overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">Unlock 15% Off</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-10 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSuccess ? (
          <div className="p-8 sm:p-10 text-center">
            {/* Decorative accent */}
            <div className="w-12 h-[2px] bg-primary mx-auto mb-6" />
            
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Exclusive Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
              Unlock 15% Off
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
              Join the TIORA circle and get 15% off your first order. Be the first to know about new collections & exclusive drops.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-muted/50 border-border text-center font-body text-sm placeholder:text-muted-foreground/60 rounded-xl"
                required
                disabled={isSubmitting}
              />
              <Button
                variant="elegant"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl"
              >
                {isSubmitting ? "Unlocking..." : "Unlock My 15% Off"}
              </Button>
            </form>

            <button
              onClick={handleDismiss}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-12 h-[2px] bg-primary mx-auto mb-6" />
            
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              You're In
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
              Welcome to TIORA
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your exclusive discount code:
            </p>

            <div className="bg-muted rounded-xl py-4 px-6 mb-6">
              <p className="font-display text-2xl tracking-[0.2em] text-primary font-semibold">
                {DISCOUNT_CODE}
              </p>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              Use this code at checkout for 15% off your first order.
            </p>

            <Button
              variant="elegant"
              size="lg"
              onClick={handleDismiss}
              className="w-full max-w-sm rounded-xl"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailPopup;
