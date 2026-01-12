import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl tracking-wider mb-4">TIORA</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Sculptural silver jewelry for the modern woman. Bold designs that celebrate your confidence and unique style.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              {["All Jewelry", "Rings", "Earrings", "Bracelets", "Necklaces", "New Arrivals"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-6">About</h4>
            <ul className="space-y-3">
              {["Our Story", "Craftsmanship", "Sustainability", "Care Guide", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    to="/about"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {["Shipping & Returns", "Track Order", "Contact Us", "Size Guide", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link
                    to="/help"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 TIORA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-primary-foreground/50">INR ₹ | India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
