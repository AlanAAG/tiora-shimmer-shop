import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const About = () => {
  const coreBeliefs = [
    {
      title: "Confidence & Empowerment",
      subtitle: "CELEBRATE. INSPIRE. EMPOWER.",
      description: "At Tiora, we believe every woman carries an innate power that deserves to be adorned. Our mission is to create pieces that don't just accessorize—they amplify. We celebrate the bold, the ambitious, and the unapologetically authentic.",
      secondParagraph: "Join us in redefining what it means to wear your confidence. Every piece is designed to be your daily armor, reminding you of your strength with every glance in the mirror. Because when you feel powerful, you become unstoppable."
    },
    {
      title: "Quality & Craftsmanship",
      subtitle: "TIMELESS DESIGN. EVERYDAY LUXURY.",
      description: "Our jewelry embodies a liquid metal aesthetic with meticulous attention to detail. Each piece is crafted with 925 sterling silver, ensuring beauty that lasts and style that transcends seasons. We believe quality should never be compromised.",
      secondParagraph: "From concept to creation, every Tiora piece undergoes rigorous quality checks. We create accessible luxury that doesn't sacrifice durability or design, so you can focus on being your most vibrant, confident self."
    },
    {
      title: "Modern Minimalism",
      subtitle: "EFFORTLESS ELEGANCE. BOLD SIMPLICITY.",
      description: "At Tiora, we believe true elegance lies in simplicity. Our designs strip away the unnecessary, leaving only what matters—clean lines, organic forms, and pieces that speak volumes through restraint.",
      secondParagraph: "Our curated collection is designed to complement your individuality, not compete with it. Whether layered or worn solo, Tiora pieces are your everyday essentials—understated yet unforgettable."
    }
  ];

  const pressQuotes = [
    {
      quote: "Jewelry that embodies fierce femininity and modern elegance.",
      source: "PRIYA SHARMA"
    },
    {
      quote: "Tiora is the silver jewelry brand every woman should know.",
      source: "ANIKA KAPOOR"
    },
    {
      quote: "Timeless pieces that are as wearable as they are stunning.",
      source: "MEERA PATEL"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden bg-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4">
              TIORA'S VISION
            </h1>
            <p className="font-body text-lg text-primary-foreground/80 max-w-xl mx-auto tracking-wide">
              Crafting confidence, one piece at a time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Beliefs Sections with Image Breaks */}
      {coreBeliefs.map((belief, index) => (
        <div key={belief.title}>
          <section 
            className={`px-4 py-16 md:py-24 ${index % 2 === 1 ? 'bg-secondary' : 'bg-background'}`}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                  {belief.title}
                </h2>
                <p className="font-body text-sm md:text-base tracking-[0.2em] text-muted-foreground mb-8">
                  {belief.subtitle}
                </p>
                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {belief.description}
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {belief.secondParagraph}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Image Section after each core belief */}
          <section className="w-full">
            <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <p className="font-body text-sm tracking-wide">Image Placeholder {index + 1}</p>
              </div>
            </div>
          </section>
        </div>
      ))}


      {/* Press Quotes */}
      <section className="px-4 py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {pressQuotes.map((item, index) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-body text-lg italic text-muted-foreground mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <p className="font-body text-xs tracking-[0.15em] text-foreground font-medium">
                  — {item.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Quality */}
      <section className="px-4 py-16 md:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Our Signature Materials
            </h2>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </motion.div>

          {/* Image Placeholder for Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <p className="font-body text-sm tracking-wide">Materials Image Placeholder</p>
              </div>
            </div>
          </motion.div>

          {/* 18k Gold Plated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              1. 18k Gold Plated
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-3xl">
              Our 18k Gold Plated jewelry is crafted with meticulous attention to detail, ensuring a luxurious and lasting finish. Our gold jewelry is plated over a base of zinc, steel, or brass, providing a perfect balance of beauty and strength. The warm golden hue adds a touch of opulence to any outfit, making it ideal for both everyday elegance and special occasions.
            </p>
          </motion.div>

          {/* Silver Plated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              2. Silver Plated
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-3xl">
              Our Silver Plated collection features classic silver, plated over zinc, steel, or brass to create lighter and classier additions to your jewelry collection. Silver jewelry that is timeless and resistant to tarnishing, the shinier and lighter finish is the perfect blend of sophisticated metal in contemporary form. Each piece embodies our signature liquid metal aesthetic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-3xl md:text-5xl text-foreground mb-2">
              4.9/5
            </p>
            <p className="font-body text-sm text-muted-foreground tracking-wide mb-6">
              Stars Rating
            </p>
            <a 
              href="/shop"
              className="inline-block border border-foreground text-foreground px-8 py-3 rounded-full font-body text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Read Reviews
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
