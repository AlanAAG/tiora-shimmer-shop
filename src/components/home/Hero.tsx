import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tiora silver jewelry collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-20">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-10">
            Wear Your <span className="italic">Confidence</span>
          </h1>
          <Button variant="hero" size="xl">
            Shop Now
          </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
