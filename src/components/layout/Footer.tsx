import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Package, RotateCcw, ShieldCheck } from "lucide-react";
import tioraLogo from "@/assets/tiora-logo.png";

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
    description: "14-day returns",
  },
];

const currencies = [
  { code: "INR", flag: "🇮🇳", name: "India" },
  { code: "USD", flag: "🇺🇸", name: "United States" },
];

const shopLinks = [
  { name: "All Items", to: "/shop" },
  { name: "Bestsellers", to: "/shop?collection=best-sellers" },
  { name: "Earrings", to: "/shop?category=earrings" },
  { name: "Bracelets", to: "/shop?category=bracelets" },
  { name: "Rings", to: "/shop?category=rings" },
];

const brandLinks = [
  { name: "About Tiora", to: "/about" },
  { name: "Reviews", to: "/reviews" },
  { name: "Giving Confidence", to: "/giving-confidence" },
];

const helpLinks = ["Returns", "FAQ", "Jewelry Care", "Privacy Policy", "Accessibility", "Contact"];

const legalLinks = ["Terms of Service", "Privacy Policy"];

// Pinterest icon component since lucide doesn't have it
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const Footer = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <footer className="bg-muted text-foreground">
      {/* Trust Badges */}
      <div className="bg-secondary/80 py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xs md:text-sm font-semibold text-foreground mb-0.5">
                  {badge.title}
                </h3>
                <p className="font-body text-[10px] md:text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stay Connected Section */}
        <div className="border-b border-border py-6">
          <h3 className="font-body text-sm font-semibold tracking-wider uppercase mb-4">
            Stay Connected
          </h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <PinterestIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Shop Section */}
        <div className="border-b border-border py-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-body text-sm font-semibold tracking-wider uppercase">Shop</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-center">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Brand Section */}
        <div className="border-b border-border py-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-body text-sm font-semibold tracking-wider uppercase">Brand</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-center">
              {brandLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Help Section */}
        <div className="border-b border-border py-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-body text-sm font-semibold tracking-wider uppercase">Help</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-center">
              {helpLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/help"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Legal Section */}
        <div className="border-b border-border py-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-body text-sm font-semibold tracking-wider uppercase">Legal</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-center">
              {legalLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/legal"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Currency Selector */}
        <div className="border-b border-border py-4">
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-lg">
                {selectedCurrency.flag}
              </span>
              <span className="font-body text-sm font-semibold">{selectedCurrency.code}</span>
            </button>
            
            {currencyOpen && (
              <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[120px]">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency);
                      setCurrencyOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                  >
                    <span className="text-lg">{currency.flag}</span>
                    <span className="text-sm">{currency.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tiora Logo */}
        <div className="flex justify-center">
          <img 
            src={tioraLogo} 
            alt="Tiora" 
            className="h-32 lg:h-40 w-auto opacity-40"
          />
        </div>

        {/* Bottom Links */}
        <div className="border-t border-border pt-6 flex flex-wrap justify-start items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span>© 2026, Tiora</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of service</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy policy</Link>
          <Link to="/cancellation" className="hover:text-foreground transition-colors">Cancellation policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
