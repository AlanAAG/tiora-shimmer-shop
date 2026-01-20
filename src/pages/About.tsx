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
      source: "VOGUE INDIA"
    },
    {
      quote: "Tiora is the silver jewelry brand every woman should know.",
      source: "COSMOPOLITAN"
    },
    {
      quote: "Timeless pieces that are as wearable as they are stunning.",
      source: "ELLE"
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

      {/* Core Beliefs Sections */}
      {coreBeliefs.map((belief, index) => (
        <section 
          key={belief.title}
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
      ))}

      {/* Timeline/Evolution */}
      <section className="bg-primary px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
              Tiora's Journey
            </h2>
            <p className="font-display text-5xl md:text-7xl text-primary-foreground/90 mb-8">
              2024 — Present
            </p>
            <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Born from a vision to empower women through everyday luxury, Tiora continues to redefine what it means to wear your confidence.
            </p>
          </motion.div>
        </div>
      </section>

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
              Our Signature Material
            </h2>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background p-8 md:p-12 rounded-lg text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              925 Sterling Silver
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              Every Tiora piece is crafted with genuine 925 sterling silver—the highest standard in silver jewelry. Known for its brilliant shine, durability, and hypoallergenic properties, our silver is designed to be worn every single day without worry.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The liquid metal finish that defines our aesthetic comes from meticulous polishing and finishing techniques, creating pieces that catch the light beautifully while maintaining their subtle, understated elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="px-4 py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { number: "10,000+", label: "Happy Customers" },
              { number: "4.9/5", label: "Stars Rating" },
              { number: "5,000+", label: "Positive Reviews" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-2xl md:text-4xl text-foreground mb-2">
                  {stat.number}
                </p>
                <p className="font-body text-xs md:text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
            Ready to Find Your Signature Piece?
          </h2>
          <p className="font-body text-primary-foreground/80 mb-8">
            Explore our collections and discover jewelry that speaks to you.
          </p>
          <a 
            href="/shop"
            className="inline-block bg-background text-foreground px-8 py-3 rounded-2xl font-body font-medium hover:bg-background/90 transition-colors"
          >
            Shop Now
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
