import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/cart/WishlistDrawer";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { SearchDialog } from "@/components/search/SearchDialog";
import { getMediaUrl } from "@/lib/cloudinary";

const tioraLogo = getMediaUrl("logo-no-bg", "image");

const SHOPIFY_ACCOUNT_URL = "https://shopify.com/94442127661/account";

interface HeaderProps {
  showBanner?: boolean;
  disableScrollHide?: boolean;
}

const Header = ({ showBanner = true, disableScrollHide = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const scrollVisibility = useScrollHeader();
  const isVisible = disableScrollHide ? true : scrollVisibility;
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  
  // Get current collection from URL
  let currentCollection = new URLSearchParams(location.search).get("collection");

  if (!currentCollection && location.pathname.startsWith("/shop/")) {
    const pathParts = location.pathname.split("/");
    if (pathParts.length >= 3) {
      currentCollection = pathParts[2];
    }
  }
  
  const baseNavLinks = [
    { name: "Shop All", href: "/shop", collection: null },
    { name: "Best Sellers", href: "/shop/best-sellers", collection: "best-sellers" },
    { name: "Rings", href: "/shop/rings", collection: "rings" },
    { name: "Earrings", href: "/shop/earrings", collection: "earrings" },
    { name: "Bracelets", href: "/shop/bracelets", collection: "bracelets" },
  ];
  
  const getDesktopNavLinks = () => {
    if (isHomePage) {
      return baseNavLinks;
    }
    
    const filteredLinks = baseNavLinks.filter(link => {
      if (currentCollection && link.collection === currentCollection) {
        return false;
      }
      if (location.pathname === "/shop" && !currentCollection && link.href === "/shop") {
        return false;
      }
      return true;
    });
    
    return [{ name: "Homepage", href: "/", collection: null }, ...filteredLinks];
  };
  
  const desktopNavLinks = getDesktopNavLinks();

  const headerTop = showBanner ? "top-10" : "top-0";
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
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-5 mr-auto pl-4">
            {desktopNavLinks.map((link) => (
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

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
            <a
              href={SHOPIFY_ACCOUNT_URL}
              aria-label="Open customer account"
            >
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </a>
            <CartDrawer />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-display text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={SHOPIFY_ACCOUNT_URL}
              className="text-lg font-display text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </a>
          </nav>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
