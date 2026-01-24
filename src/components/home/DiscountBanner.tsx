import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
interface DiscountBannerProps {
  className?: string;
}
const DiscountBanner = ({
  className = ""
}: DiscountBannerProps) => {
  const isVisible = useScrollHeader();
  return <Link to="/shop" className={`block bg-primary text-primary-foreground py-2.5 text-center font-body text-sm tracking-wide hover:bg-emerald-rich transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} ${className}`}>
      <span className="inline-flex items-center gap-2">Valentine's Sale: 20% Off Everything!<ArrowRight className="w-4 h-4" />
      </span>
    </Link>;
};
export default DiscountBanner;