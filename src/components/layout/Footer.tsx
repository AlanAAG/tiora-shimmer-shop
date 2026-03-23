import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Instagram, Package, RotateCcw, ShieldCheck, Check, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { getMediaUrl } from "@/lib/cloudinary";
import { supabase } from "@/lib/supabase";
import { hasBlockingSupabaseError, isDuplicateLeadError, isRlsInsertError } from "@/lib/leadCapture";
import { toast } from "sonner";
import { trackLead } from "@/lib/metaPixel";

const tioraLogo = getMediaUrl("logo-no-bg", "image");

const DISCOUNT_CODE = "WELCOME10";
const KLAVIYO_COMPANY_ID = "Wad9ct";
const KLAVIYO_LIST_ID = "VstZ54";

const trustBadges = [
  { icon: Package, title: "Free Shipping", description: "On all national orders" },
  { icon: ShieldCheck, title: "Quality Assured", description: "Certified materials" },
  { icon: RotateCcw, title: "Easy Returns", description: "7-day returns" },
];

const shopLinks = [
  { name: "All Items", to: "/shop" },
  { name: "Best Sellers", to: "/shop/best-sellers" },
  { name: "Rings", to: "/shop/rings" },
  { name: "Earrings", to: "/shop/earrings" },
  { name: "Bracelets", to: "/shop/bracelets" },
];

const brandLinks = [
  { name: "About Tiora", to: "/about" },
  { name: "Reviews", to: "/reviews" },
  { name: "Journal", to: "/blog" },
];

const helpLinks = [
  { name: "FAQ", to: "/faq" },
  { name: "Return & Refund", to: "/refund" },
  { name: "Shipping Policy", to: "/shipping" },
  { name: "Jewelry Care", to: "/care-guide" },
  { name: "Contact", to: "/contact" },
];

const legalLinks = [
  { name: "Terms of Service", to: "/terms" },
  { name: "Privacy Policy", to: "/privacy" },
];

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCleanPhone = (): string | null => {
    const trimmed = phone.trim().replace(/[\s\-()]/g, "");
    if (!trimmed || trimmed === "+91" || trimmed === "+") return null;
    return trimmed;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      toast.success("Discount code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — try manually.");
    }
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
      if (!cleanedPhone.startsWith("+")) {
        toast.error("Phone number must start with a country code (e.g. +91).");
        return;
      }
      if (!/^\+\d{7,15}$/.test(cleanedPhone)) {
        toast.error("Please enter a valid phone number in international format (e.g. +919876543210).");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const supabaseInsert: Record<string, string> = { email: trimmedEmail };
      if (cleanedPhone) supabaseInsert.phone_number = cleanedPhone;

      const klaviyoProfile: Record<string, string> = { email: trimmedEmail };
      if (cleanedPhone) klaviyoProfile.phone_number = cleanedPhone;

      const klaviyoBody = {
        data: {
          type: "subscription",
          attributes: {
            custom_source: "Footer Newsletter",
            profile: {
              data: { type: "profile", attributes: klaviyoProfile },
            },
          },
          relationships: {
            list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
          },
        },
      };

      const results = await Promise.allSettled([
        supabase.from("newsletter_leads").insert(supabaseInsert),
        fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", revision: "2024-02-15" },
          body: JSON.stringify(klaviyoBody),
        }),
      ]);

      const supabaseResult = results[0];
      const klaviyoResult = results[1];

      const isDuplicate = isDuplicateLeadError(supabaseResult);
      const hasError = hasBlockingSupabaseError(supabaseResult);
      const hasRls = isRlsInsertError(supabaseResult);

      if (isDuplicate) {
        toast.info(`You're already subscribed! Use code ${DISCOUNT_CODE} at checkout.`);
        setIsSuccess(true);
        return;
      } else if (hasError) {
        console.error("Supabase insert failed:", supabaseResult.status === "rejected" ? supabaseResult.reason : supabaseResult.value.error);
        toast.error("We couldn't save your details. Please try again.");
        return;
      } else if (hasRls) {
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
      trackLead({ contentName: 'Footer Newsletter Signup' });
      toast.success("Welcome to the Tiora Circle!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <div className="font-display text-2xl italic mb-2">You're In! 🎉</div>
        <p className="font-body text-xs text-primary-foreground/80 mb-3">
          Your exclusive discount code:
        </p>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2.5 rounded-full font-display text-lg tracking-[0.15em] font-semibold hover:bg-primary-foreground/90 transition-colors mb-2 w-fit"
        >
          {DISCOUNT_CODE}
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        <p className="font-body text-xs text-primary-foreground/60">
          Use at checkout for 10% off your first order.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="font-display text-2xl italic mb-2">Join the Tiora Circle</div>
      <p className="font-body text-xs text-primary-foreground/80 mb-4 max-w-xs">
        Unlock 10% Off When You Join the Tiora Inner Circle—Where Style Meets Community.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-primary-foreground text-foreground border-none h-10 rounded-full text-sm"
          required
          disabled={isSubmitting}
        />
        <Input
          type="tel"
          placeholder="WhatsApp number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-primary-foreground text-foreground border-none h-10 rounded-full text-sm"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest rounded-full text-xs"
        >
          {isSubmitting ? "Joining..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-primary-foreground">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": "TIORA",
            "image": getMediaUrl("branding-og-image", "image"),
            "@id": "https://tiora.co",
            "url": "https://tiora.co",
            "telephone": "+91 7897777767",
            "priceRange": "₹1,800 - ₹3,500",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Phase II, Udyog Vihar, Sector 20",
              "addressLocality": "Gurugram",
              "addressRegion": "Haryana",
              "postalCode": "122016",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.504,
              "longitude": 77.084
            }
          })}
        </script>
      </Helmet>
      {/* Main Footer - Green Background */}
      <div className="bg-primary py-10">
        <div className="container mx-auto px-6">
          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-primary-foreground/20">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 flex items-center justify-center">
                  <badge.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div className="font-display text-sm md:text-base font-semibold text-primary-foreground mb-1">
                  {badge.title}
                </div>
                <p className="font-body text-xs md:text-sm text-primary-foreground/70">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="mb-8">
              <FooterNewsletter />
            </div>

            {/* Stay Connected */}
            <div className="mb-8">
              <div className="font-body text-sm font-semibold tracking-wider uppercase mb-4">Stay Connected</div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/tiora.official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/918800823166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>

                <a
                  href="https://g.page/r/CZnqnxw9jYksEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm font-bold w-fit hover:bg-white/90 transition-colors"
                >
                  <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </a>

                <div className="text-xs text-primary-foreground/80 mt-2 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 78977 77767</p>
                </div>
              </div>
            </div>

            {/* Collapsible Links */}
            {[
              { title: "Shop", links: shopLinks },
              { title: "Brand", links: brandLinks },
              { title: "Help", links: helpLinks },
              { title: "Legal", links: legalLinks },
            ].map((section) => (
              <div key={section.title} className="border-b border-primary-foreground/20 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-body text-sm font-semibold tracking-wider uppercase">{section.title}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-4 space-y-3 text-center">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-6 gap-6">
            <div className="col-span-2">
              <FooterNewsletter />

              {/* Stay Connected */}
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3 mt-6">Stay Connected</div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <a
                    href="https://www.instagram.com/tiora.official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/918800823166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>

                <a
                  href="https://g.page/r/CZnqnxw9jYksEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded text-xs font-bold w-fit hover:bg-white/90 transition-colors"
                >
                  <div className="flex text-yellow-500 text-[10px]">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </a>

                <div className="text-xs text-primary-foreground/80 mt-4 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 78977 77767</p>
                </div>
              </div>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Shop</div>
              <ul className="space-y-1.5">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Brand</div>
              <ul className="space-y-1.5">
                {brandLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Help</div>
              <ul className="space-y-1.5">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Legal</div>
              <ul className="space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo */}
          <div className="mt-10 pt-6 border-t border-primary-foreground/20 flex justify-center">
            <img src={tioraLogo} alt="Tiora" className="h-24 md:h-32 brightness-0 invert" />
          </div>

          {/* Bottom - Copyright */}
          <div className="mt-6 pt-4 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-primary-foreground/70">
                <span>© 2026, Tiora</span>
                <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of service</Link>
                <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy policy</Link>
                <Link to="/refund" className="hover:text-primary-foreground transition-colors">Return & Refund policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
