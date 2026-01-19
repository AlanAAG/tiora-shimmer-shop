import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="font-display text-4xl md:text-6xl text-white mb-4">About Tiora</h1>
            <p className="font-body text-lg text-white/90 max-w-xl mx-auto">
              Crafting confidence, one piece at a time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Our Story</h2>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 font-body text-muted-foreground leading-relaxed"
          >
            <p>
              Tiora was born from a simple belief: every woman deserves jewelry that makes her feel powerful, 
              confident, and unapologetically herself. Founded in 2024, we set out to create pieces that 
              aren't just accessories—they're daily armor for the modern woman.
            </p>
            <p>
              Our name, Tiora, draws inspiration from the concept of a crown—a symbol of the inherent 
              royalty within every woman who wears our pieces. Each design is crafted with meticulous 
              attention to detail, using premium 925 sterling silver that's meant to be worn every single day.
            </p>
            <p>
              We believe in the transformative power of jewelry. That moment when you clasp on a piece 
              and catch your reflection—feeling a little taller, a little bolder, a little more you. 
              That's the Tiora experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="bg-secondary">
        <div className="grid md:grid-cols-2 gap-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square md:aspect-auto"
          >
            <img 
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop&q=80"
              alt="Tiora jewelry craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center px-6 py-12 md:px-12 md:py-0"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Our Mission</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                To empower women through thoughtfully designed, high-quality silver jewelry that 
                celebrates individuality and inspires confidence in everyday moments.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We're committed to sustainable practices, ethical sourcing, and creating pieces 
                that transcend trends—jewelry you'll reach for again and again, year after year.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-foreground text-center mb-12"
          >
            What We Stand For
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Every piece is crafted with 925 sterling silver, designed to be your everyday companion."
              },
              {
                title: "Effortless Elegance",
                description: "Minimalist designs with a liquid metal aesthetic that complements any style."
              },
              {
                title: "Confidence Always",
                description: "Jewelry that empowers you to show up as your boldest, most authentic self."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-display text-xl text-foreground mb-3">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.description}
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
          <h2 className="font-display text-3xl text-primary-foreground mb-4">
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