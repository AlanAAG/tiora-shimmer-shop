import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDesktop from "@/assets/hero-desktop.png";
import heroMobile from "@/assets/hero-mobile.png";

const Hero = () => {
  return (
    <section className="relative w-full md:aspect-[2/1] lg:aspect-[7/3] overflow-hidden mt-4">
      {/* Background Image */}
      <div className="relative w-full md:absolute md:inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          <img
            src={heroMobile}
            alt="Waterproof 18k gold-plated jewelry collection featuring sculptural designs"
            className="w-full h-auto md:h-full md:object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 md:pb-16 px-6 animate-fade-up flex flex-col items-center">
        <Button
          variant="hero"
          size="xl"
          className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
          asChild
        >
          <Link to="/shop">SHOP NOW</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
