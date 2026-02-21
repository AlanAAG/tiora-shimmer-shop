import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Instagram, Package, RotateCcw, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { getMediaUrl } from "@/lib/cloudinary";

const tioraLogo = getMediaUrl("logo/logo-no-bg", "image");

const trustBadges = [
{
  icon: Package,
  title: "Free Shipping",
  description: "On all national orders"
},
{
  icon: ShieldCheck,
  title: "Quality Assured",
  description: "Certified materials"
},
{
  icon: RotateCcw,
  title: "Easy Returns",
  description: "7-day returns"
}];


const shopLinks = [
{ name: "All Items", to: "/shop" },
{ name: "Best Sellers", to: "/shop/best-sellers" },
{ name: "Rings", to: "/shop/rings" },
{ name: "Earrings", to: "/shop/earrings" },
{ name: "Bracelets", to: "/shop/bracelets" }];


const brandLinks = [
{ name: "About Tiora", to: "/about" },
{ name: "Reviews", to: "/reviews" }];


const helpLinks = [
{ name: "FAQ", to: "/faq" },
{ name: "Return & Refund", to: "/refund" },
{ name: "Shipping Policy", to: "/shipping" },
{ name: "Jewelry Care", to: "/care-guide" },
{ name: "Contact", to: "/contact" }];


const legalLinks = [
{ name: "Terms of Service", to: "/terms" },
{ name: "Privacy Policy", to: "/privacy" }];


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
            "image": getMediaUrl("branding/og-image", "image"),
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
          {/* Trust Badges - Inside green section */}
          <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-primary-foreground/20">
            {trustBadges.map((badge, index) =>
            <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 flex items-center justify-center">
                  <badge.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div className="font-display text-sm md:text-base font-semibold text-primary-foreground mb-1">
                  {badge.title}
                </div>
                <p className="font-body text-xs md:text-sm text-primary-foreground/70">{badge.description}</p>
              </div>
            )}
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
                  className="bg-primary-foreground text-foreground border-none h-12 rounded-full" />

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
                    className="w-10 h-10 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors">

                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/918800823166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors">

                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>

                {/* Google Review Badge */}
                <a
                  href="https://g.page/r/CZnqnxw9jYksEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm font-bold w-fit hover:bg-white/90 transition-colors"
                >
                  <div className="flex text-yellow-500 text-xs">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </a>

                {/* Address */}
                <div className="text-xs text-primary-foreground/80 mt-2 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 78977 77767</p>
                </div>
              </div>
            </div>

            {/* Collapsible Links - Mobile Only */}
            {[
            { title: "Shop", links: shopLinks },
            { title: "Brand", links: brandLinks },
            { title: "Help", links: helpLinks },
            { title: "Legal", links: legalLinks }].
            map((section) =>
            <div key={section.title} className="border-b border-primary-foreground/20 py-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-body text-sm font-semibold tracking-wider uppercase">{section.title}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-4 space-y-3 text-center">
                    {section.links.map((link) =>
                  <li key={link.name}>
                        <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">

                          {link.name}
                        </Link>
                      </li>
                  )}
                  </ul>
                </details>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-6 gap-6">
            {/* Left Side - Newsletter + Social */}
            <div className="col-span-2">
              {/* Join Tiora Circle */}
              <div className="font-display text-2xl italic mb-2">Join the Tiora Circle</div>
              <p className="font-body text-xs text-primary-foreground/80 mb-4 max-w-xs">Unlock 10% Off When You Join the Tiora Inner Circle—Where Style Meets Community.

              </p>
              <div className="flex flex-col gap-2 max-w-xs mb-6">
                <Input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-primary-foreground text-foreground border-none h-10 rounded-full text-sm" />

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
                    className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors">

                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/918800823166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:bg-primary-foreground/80 transition-colors">

                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>

                {/* Google Review Badge */}
                <a
                  href="https://g.page/r/CZnqnxw9jYksEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded text-xs font-bold w-fit hover:bg-white/90 transition-colors"
                >
                  <div className="flex text-yellow-500 text-[10px]">★★★★★</div>
                  <span>4.9/5 on Google</span>
                </a>

                {/* Address */}
                <div className="text-xs text-primary-foreground/80 mt-4 space-y-1">
                  <p className="font-semibold">TIORA</p>
                  <p>Phase II, Udyog Vihar, Sector 20</p>
                  <p>Gurugram, Gurgaon, Haryana 122016</p>
                  <p>Phone: +91 78977 77767</p>
                </div>
              </div>
            </div>

            {/* Right Side - Link Columns - All 4 in one row */}
            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Shop</div>
              <ul className="space-y-1.5">
                {shopLinks.map((link) =>
                <li key={link.name}>
                    <Link
                    to={link.to}
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">

                      {link.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Brand</div>
              <ul className="space-y-1.5">
                {brandLinks.map((link) =>
                <li key={link.name}>
                    <Link
                    to={link.to}
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">

                      {link.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Help</div>
              <ul className="space-y-1.5">
                {helpLinks.map((link) =>
                <li key={link.name}>
                    <Link
                    to={link.to}
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">

                      {link.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-wider uppercase mb-3">Legal</div>
              <ul className="space-y-1.5">
                {legalLinks.map((link) =>
                <li key={link.name}>
                    <Link
                    to={link.to}
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">

                      {link.name}
                    </Link>
                  </li>
                )}
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
    </footer>);

};

export default Footer;