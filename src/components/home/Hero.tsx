import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/cloudinary";

// IDs mapped from media_map.md
const heroDesktop = getMediaUrl("home-hero-desktop", "image");
const heroMobile = getMediaUrl("home-hero-mobile", "image");

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
            className="w-full h-auto" />

        </picture>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 md:left-auto md:right-0 md:w-[45%] z-10 pb-6 md:pb-12 animate-fade-up flex-col md:items-center flex items-end justify-end px-[70px]">
        <Button
          variant="hero"
          className="bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-xl md:h-20 md:px-16 md:text-2xl"
          asChild>

          <Link to="/shop">SHOP NOW</Link>
        </Button>
      </div>
    </section>);

};

export default Hero;