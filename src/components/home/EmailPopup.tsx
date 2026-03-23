import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { getMediaUrl } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { hasBlockingSupabaseError, isDuplicateLeadError, isRlsInsertError } from "@/lib/leadCapture";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_DISMISSED_KEY = "tiora_email_popup_dismissed";
const DISCOUNT_CODE = "WELCOME15";
const KLAVIYO_COMPANY_ID = "Wad9ct";
const KLAVIYO_LIST_ID = "RzNi2M";

const EmailPopup = () => {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91");
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
    if (!isSuccess) {
      setShowTeaser(true);
    } else {
      localStorage.setItem(POPUP_DISMISSED_KEY, "true");
    }
  };

  const handleTeaserClick = () => {
    setShowTeaser(false);
    setOpen(true);
  };

  const handleTeaserClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, "true");
  };

  const getCleanPhone = (): string | null => {
    const trimmed = phone.trim().replace(/[\s\-()]/g, "");
    // Treat "+91" alone (or just "+") as blank
    if (!trimmed || trimmed === "+91" || trimmed === "+") return null;
    return trimmed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const cleanedPhone = getCleanPhone();

    if (cleanedPhone) {
      // Ensure it starts with +
      if (!cleanedPhone.startsWith("+")) {
        toast.error("Phone number must start with a country code (e.g. +91).");
        return;
      }
      // E.164: + followed by 7-15 digits
      if (!/^\+\d{7,15}$/.test(cleanedPhone)) {
        toast.error("Please enter a valid phone number in international format (e.g. +919876543210).");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const supabaseInsert: Record<string, string> = {
        email: trimmedEmail,
      };
      if (cleanedPhone) supabaseInsert.phone_number = cleanedPhone;

      const klaviyoProfile: Record<string, string> = { email: trimmedEmail };
      if (cleanedPhone) {
        klaviyoProfile.phone_number = cleanedPhone;
      }

      const klaviyoBody = {
        data: {
          type: "subscription",
          attributes: {
            custom_source: "Lovable Discount Pop-up",
            profile: {
              data: {
                type: "profile",
                attributes: klaviyoProfile,
              },
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: KLAVIYO_LIST_ID,
              },
            },
          },
        },
      };

      const results = await Promise.allSettled([
        // Call 1: Supabase
        supabase.from("newsletter_leads").insert(supabaseInsert),
        // Call 2: Klaviyo Client API
        fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            revision: "2024-02-15",
          },
          body: JSON.stringify(klaviyoBody),
        }),
      ]);

      const supabaseResult = results[0];
      const klaviyoResult = results[1];

      // Check for Supabase duplicate
      const isDuplicateLead = isDuplicateLeadError(supabaseResult);
      const hasSupabaseError = hasBlockingSupabaseError(supabaseResult);
      const hasRlsInsertError = isRlsInsertError(supabaseResult);

      if (isDuplicateLead) {
        toast.info("You're already subscribed! Use code WELCOME15 at checkout.");
      } else if (hasSupabaseError) {
        console.error("Supabase insert failed:", supabaseResult.status === "rejected" ? supabaseResult.reason : supabaseResult.value.error);
        toast.error("We couldn't save your details. Please try again.");
        return;
      } else if (hasRlsInsertError) {
        console.warn("Supabase newsletter_leads insert blocked by RLS; continuing because Klaviyo subscription succeeded.");
      }

      if (klaviyoResult.status === "rejected") {
        console.error("Klaviyo sync failed:", klaviyoResult.reason);
        toast.error("We couldn't subscribe you right now. Please try again.");
        return;
      } else if (!klaviyoResult.value.ok) {
        console.error("Klaviyo API error:", klaviyoResult.value.status, await klaviyoResult.value.text().catch(() => ""));
        toast.error("We couldn't subscribe you right now. Please try again.");
        return;
      }

      // Drop Klaviyo tracking cookie
      if (typeof window !== 'undefined' && (window as any).klaviyo) {
        const identifyData: Record<string, string> = { '$email': trimmedEmail };
        if (cleanedPhone) identifyData['$phone_number'] = cleanedPhone;
        (window as any).klaviyo.push(['identify', identifyData]);
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
    <>
      {/* Teaser tab */}
      <AnimatePresence>
        {showTeaser && !open && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleTeaserClick}
            className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          >
            <div className="flex items-center gap-3 bg-primary text-primary-foreground pl-4 pr-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Gift className="w-5 h-5 shrink-0" />
              <span className="font-body text-sm font-medium whitespace-nowrap">
                Get 15% Off
              </span>
              <button
                onClick={handleTeaserClose}
                className="ml-1 rounded-full p-0.5 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Close teaser"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full popup */}
      <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
        <DialogContent className="sm:max-w-[750px] p-0 gap-0 border-none bg-background overflow-hidden rounded-2xl [&>button:last-child]:hidden">
          <div className="flex flex-col sm:flex-row">
          <DialogTitle className="sr-only">Unlock 15% Off</DialogTitle>
          
          {/* Image */}
          <div className="h-40 sm:h-auto sm:w-[280px] shrink-0">
            <img
              src={getMediaUrl("email")}
              alt="TIORA jewelry"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
          
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 z-10 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {!isSuccess ? (
            <div className="p-8 sm:p-10 text-center">
              <div className="w-12 h-[2px] bg-primary mx-auto mb-6" />
              
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Exclusive Offer
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
                Unlock 15% Off
              </h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
                Enter your email and WhatsApp number to get 15% off your first order. Be the first to know about new collections & exclusive drops.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-muted/50 border-border text-center font-body text-sm placeholder:text-muted-foreground/60 rounded-xl"
                  required
                  disabled={isSubmitting}
                />
                <Input
                  type="tel"
                  placeholder="WhatsApp number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-muted/50 border-border text-center font-body text-sm placeholder:text-muted-foreground/60 rounded-xl"
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
          </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailPopup;
