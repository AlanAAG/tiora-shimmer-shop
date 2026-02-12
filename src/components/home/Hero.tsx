import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroDesktop from "@/assets/hero-desktop.png";
import heroMobile from "@/assets/hero-mobile.png";

const Hero = () => {
  return <section className="relative aspect-[8/9] md:aspect-[2/1] lg:aspect-[7/3] flex flex-col justify-end overflow-hidden mt-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          <img src={heroMobile} alt="Waterproof 18k gold-plated jewelry collection featuring sculptural designs" className="w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      {/* Bottom Content */}
      <div className="relative pb-10 md:pb-16 px-6 animate-fade-up">
        
        <p className="font-body text-base text-primary-foreground/90 mb-5 md:text-xl">

      </p>
        <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg" asChild>
          <Link to="/shop">SHOP NOW</Link>
        </Button>
      </div>
    </section>;
};
export default Hero;