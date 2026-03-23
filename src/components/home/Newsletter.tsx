import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const KLAVIYO_COMPANY_ID = "Wad9ct";
const KLAVIYO_LIST_ID = "XvtJPt";

const Newsletter = () => {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim().replace(/[\s\-()]/g, "");

    if (!trimmed || trimmed === "+91" || trimmed === "+") {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!trimmed.startsWith("+")) {
      toast.error("Phone number must start with a country code (e.g. +91).");
      return;
    }
    if (!/^\+\d{7,15}$/.test(trimmed)) {
      toast.error("Please enter a valid phone number (e.g. +919876543210).");
      return;
    }

    setIsSubmitting(true);
    try {
      const klaviyoBody = {
        data: {
          type: "subscription",
          attributes: {
            custom_source: "Lovable Footer Newsletter",
            profile: {
              data: { type: "profile", attributes: { phone_number: trimmed } },
            },
          },
          relationships: {
            list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
          },
        },
      };

      const results = await Promise.allSettled([
        supabase.from("newsletter_leads").insert({
          phone_number: trimmed,
          source: "footer",
        }),
        fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", revision: "2024-02-15" },
          body: JSON.stringify(klaviyoBody),
        }),
      ]);

      const sbResult = results[0];
      if (sbResult.status === "fulfilled" && sbResult.value.error?.code === "23505") {
        toast.info("You're already subscribed!");
      } else if (sbResult.status === "fulfilled" && sbResult.value.error) {
        console.error("Supabase error:", sbResult.value.error);
        toast.error("Something went wrong. Please try again.");
      } else {
        toast.success("You're subscribed! Welcome to the TIORA Circle.");
      }

      if (results[1].status === "rejected") {
        console.error("Klaviyo sync failed:", (results[1] as PromiseRejectedResult).reason);
      }

      setPhone("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Join the TIORA Circle
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Be the first to know about new collections, exclusive offers, and styling inspiration delivered to your phone.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-12 bg-background border-border focus:border-primary"
              required
            />
            <Button variant="elegant" size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing messages from TIORA.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;