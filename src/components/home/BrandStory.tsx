import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/cloudinary";

const tioraLogo = getMediaUrl("logo/logo.png", "image");

const BrandStory = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={tioraLogo}
                alt="Tiora brand"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/20 hidden lg:block" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Wear Your <br />
              <span className="italic text-primary">Confidence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                TIORA was born from a simple belief: jewelry should be as bold and multifaceted as the women who wear it. Our liquid metal designs flow like water but stand as strong as your ambitions.
              </p>
              <p>
                Each piece is crafted for the modern woman who writes her own story—whether she's closing deals in the boardroom or dancing under city lights. Premium 925 silver, designed in India, made to make you feel unstoppable.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 mb-10">
              <div>
                <p className="font-display text-4xl text-primary mb-1">925</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">Pure Silver</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary mb-1">100%</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">Handcrafted</p>
              </div>
            </div>
            <Button variant="elegant" size="lg">
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
