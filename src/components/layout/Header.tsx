import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import tioraLogo from "@/assets/tiora-logo.png";

interface HeaderProps {
  showBanner?: boolean;
}

const Header = ({ showBanner = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isVisible = useScrollHeader();

  const navLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "Best Sellers", href: "/shop?collection=best-sellers" },
    { name: "Rings", href: "/shop?collection=rings" },
    { name: "Earrings", href: "/shop?collection=earrings" },
    { name: "Bracelets", href: "/shop?collection=bracelets" },
    { name: "Necklaces", href: "/shop?collection=necklaces" },
  ];

  const headerTop = showBanner ? "top-10" : "top-0";
  // When hiding, translate by full header height + banner height if banner is shown
  const hideTransform = showBanner ? "-translate-y-[calc(100%+2.5rem)]" : "-translate-y-full";

  return (
    <header className={`fixed ${headerTop} left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${isVisible ? "translate-y-0" : hideTransform}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Icons - Mobile */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              className="p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-5 mr-auto pl-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-body tracking-wide text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img 
              src={tioraLogo} 
              alt="Tiora" 
              className="h-20 lg:h-32 w-auto"
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <CartDrawer />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-display text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
