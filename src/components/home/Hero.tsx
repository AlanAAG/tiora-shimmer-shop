import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative aspect-[3/4] md:aspect-[16/9] lg:aspect-[2/1] flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tiora jewelry collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/30" />
      </div>

      {/* Top Content */}
      <div className="relative pt-8 md:pt-12 px-6">
        <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic animate-fade-up">
          Confidence looks good on you
        </p>
      </div>

      {/* Bottom Content */}
      <div className="relative pb-10 md:pb-16 px-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-6 max-w-lg">
          25% off on your daily wear armour
        </h1>
        <Button 
          variant="hero" 
          size="xl"
          className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <Link to="/shop">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
