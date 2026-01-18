import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", phone);
    setPhone("");
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
            <Button variant="elegant" size="lg" type="submit">
              Subscribe
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