import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const currencies = [
  { code: "INR", flag: "🇮🇳", name: "India" },
  { code: "USD", flag: "🇺🇸", name: "United States" },
];

const Footer = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <footer className="bg-muted text-foreground">
      <div className="container mx-auto px-6 py-8">
        {/* Help Section */}
        <div className="border-b border-border py-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer list-none">
              <span className="font-body text-sm font-semibold tracking-wider uppercase">Help</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-3 text-center">
              {["Returns", "FAQ", "Jewelry Care", "Privacy Policy", "Accessibility", "Contact"].map((item) => (
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
              {["Terms of Service", "Privacy Policy"].map((item) => (
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
        <div className="py-8 flex justify-center">
          <h3 className="font-display text-5xl tracking-wider text-muted-foreground/40">TIORA</h3>
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
