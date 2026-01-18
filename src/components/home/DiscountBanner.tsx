import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DiscountBanner = () => {
  return (
    <Link 
      to="/shop" 
      className="block bg-primary text-primary-foreground py-2.5 text-center font-body text-sm tracking-wide hover:bg-emerald-rich transition-colors"
    >
      <span className="inline-flex items-center gap-2">
        Valentine's Sale: 25% Off Everything!
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
};

export default DiscountBanner;
