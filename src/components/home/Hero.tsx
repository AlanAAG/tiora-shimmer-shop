import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
const Hero = () => {
  return <section className="relative aspect-[8/9] md:aspect-[2/1] lg:aspect-[7/3] flex flex-col justify-end overflow-hidden mt-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Waterproof 18k gold-plated jewelry collection featuring sculptural designs" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      {/* Bottom Content */}
      <div className="relative pb-10 md:pb-16 px-6 animate-fade-up">
        <h1 className="font-display md:text-4xl lg:text-5xl text-primary-foreground leading-[1.1] mb-2 text-5xl font-extrabold">Confidence
Looks Good
On You</h1>
        <p className="font-body text-base text-primary-foreground/90 mb-5 md:text-xl">
      </p>
        <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg" asChild>
          <Link to="/shop">SHOP NOW</Link>
        </Button>
      </div>
    </section>;
};
export default Hero;