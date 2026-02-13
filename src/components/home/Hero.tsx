import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDesktop from "@/assets/hero-desktop-v2.png";
import heroMobile from "@/assets/hero-mobile-v3.png";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden mt-4">
      {/* Background Image */}
      <div className="relative w-full">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          <img
            src={heroMobile}
            alt="Waterproof 18k gold-plated jewelry collection featuring sculptural designs"
            className="w-full h-auto"
          />
        </picture>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 md:left-[25%] md:right-auto md:-translate-x-1/2 z-10 pb-10 md:pb-16 px-6 animate-fade-up flex flex-col items-end md:items-start">
        <Button
          variant="hero"
          className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-xl md:h-20 md:px-16 md:text-2xl"
          asChild
        >
          <Link to="/shop">SHOP NOW</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
