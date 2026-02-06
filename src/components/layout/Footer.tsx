import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Instagram, Package, RotateCcw, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import tioraLogo from "@/assets/tiora-logo.png";
import { Helmet } from "react-helmet-async";

const trustBadges = [
  {
    icon: Package,
    title: "Free Shipping",
    description: "On orders ₹8,000+",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Certified materials",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day returns",
  },
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
];

const helpLinks = [
  { name: "FAQ", to: "/faq" },
  { name: "Return & Refund", to: "/refund" },
  { name: "Jewelry Care", to: "/care-guide" },
  { name: "Contact", to: "/contact" },
];

const legalLinks = [
  { name: "Terms of Service", to: "/terms" },
  { name: "Privacy Policy", to: "/privacy" },
];

const Footer = () => {
  const [phone, setPhone] = useState("");

  return (
    <footer className="text-primary-foreground">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": "TIORA",
            "image": "https://tiora.co/og-image.jpg",
            "@id": "https://tiora.co",
            "url": "https://tiora.co",
            "telephone": "+91 0000000000",
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
          {/* Trust Badges - Inside green section */}
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
            {/* Join Tiora Circle */}
            <div className="mb-8">
              <div className="font-display text-2xl italic mb-3">Join the Tiora Circle</div>
              <p className="font-body text-xs text-primary-foreground/80 mb-4">
                Unlock 15% Off When You Join the Tiora Inner Circle—Where Style Meets Community.
              </p>
              <div className="flex flex-col gap-3">
                <Input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-primary-foreground text-foreground border-none h-12 rounded-full"
                />
                <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest rounded-full text-xs">
                  Sign Up
                </Button>
              </div>
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
                </div>

                {/* Google Review Badge */}
                <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm font-bold w-fit">
                  <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </div>

                {/* Address */}
                <div className="text-xs text-primary-foreground/80 mt-2 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 000 000 0000</p>
                </div>
              </div>
            </div>

            {/* Collapsible Links - Mobile Only */}
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
                        <Link
                          to={link.to}
                          className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                        >
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
            {/* Left Side - Newsletter + Social */}
            <div className="col-span-2">
              {/* Join Tiora Circle */}
              <div className="font-display text-2xl italic mb-2">Join the Tiora Circle</div>
              <p className="font-body text-xs text-primary-foreground/80 mb-4 max-w-xs">
                Unlock 15% Off When You Join the Tiora Inner Circle—Where Style Meets Community.
              </p>
              <div className="flex flex-col gap-2 max-w-xs mb-6">
                <Input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-primary-foreground text-foreground border-none h-10 rounded-full text-sm"
                />
                <Button className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-body uppercase tracking-widest rounded-full text-xs">
                  Sign Up
                </Button>
              </div>

              {/* Stay Connected */}
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Stay Connected</div>
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
                </div>

                {/* Google Review Badge */}
                <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded text-xs font-bold w-fit">
                  <div className="flex text-yellow-500 text-[10px]">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </div>

                {/* Address */}
                <div className="text-xs text-primary-foreground/80 mt-4 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 000 000 0000</p>
                </div>
              </div>
            </div>

            {/* Right Side - Link Columns - All 4 in one row */}
            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Shop</div>
              <ul className="space-y-1.5">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                    >
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
                    <Link
                      to={link.to}
                      className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                    >
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
                    <Link
                      to={link.to}
                      className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                    >
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
                    <Link
                      to={link.to}
                      className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
                    >
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
                <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                  Terms of service
                </Link>
                <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                  Privacy policy
                </Link>
                <Link to="/refund" className="hover:text-primary-foreground transition-colors">
                  Return & Refund policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
