import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import productRing from "@/assets/product-ring.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const allProducts = {
  rings: [
    { id: 1, name: "Wave Sculpt Ring", price: 4500, image: productRing, isNew: true },
    { id: 2, name: "Liquid Twist Ring", price: 3800, image: productRing, isNew: false },
    { id: 3, name: "Fluid Band Ring", price: 5200, image: productRing, isNew: true },
    { id: 4, name: "Molten Edge Ring", price: 4200, image: productRing, isNew: false },
  ],
  earrings: [
    { id: 5, name: "Cascade Earrings", price: 5800, image: productEarrings, isNew: true },
    { id: 6, name: "Drop Flow Earrings", price: 6200, image: productEarrings, isNew: false },
    { id: 7, name: "Sculpted Hoops", price: 7500, image: productEarrings, isNew: true },
    { id: 8, name: "Liquid Studs", price: 3500, image: productEarrings, isNew: false },
  ],
  bracelets: [
    { id: 9, name: "Fluid Link Bracelet", price: 7200, image: productBracelet, isNew: false },
    { id: 10, name: "Wave Cuff", price: 8500, image: productBracelet, isNew: true },
    { id: 11, name: "Liquid Chain Bracelet", price: 6800, image: productBracelet, isNew: false },
    { id: 12, name: "Molten Bangle", price: 9200, image: productBracelet, isNew: true },
  ],
  necklaces: [
    { id: 13, name: "Liquid Flow Necklace", price: 9500, image: productNecklace, isNew: false },
    { id: 14, name: "Cascade Pendant", price: 7800, image: productNecklace, isNew: true },
    { id: 15, name: "Wave Chain Necklace", price: 8200, image: productNecklace, isNew: false },
    { id: 16, name: "Fluid Choker", price: 6500, image: productNecklace, isNew: true },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isNew: boolean;
}

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">
          New
        </span>
      )}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      <Button
        variant="hero"
        size="sm"
        className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        Quick Add
      </Button>
    </div>
    <div className="text-center">
      <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="font-body text-sm text-muted-foreground">
        {formatPrice(product.price)}
      </p>
    </div>
  </div>
);

interface CategorySectionProps {
  id: string;
  title: string;
  products: Product[];
}

const CategorySection = ({ id, title, products }: CategorySectionProps) => (
  <section id={id} className="py-20 scroll-mt-24">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-foreground">{title}</h2>
        <div className="h-px flex-1 bg-border ml-8" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

const Shop = () => {
  const location = useLocation();
  const categories = [
    { id: "rings", label: "Rings" },
    { id: "earrings", label: "Earrings" },
    { id: "bracelets", label: "Bracelets" },
    { id: "necklaces", label: "Necklaces" },
  ];

  // Auto-scroll to section based on route
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (path && path !== "shop") {
      setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            The Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
            Shop All
          </h1>
          
          {/* Category Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className="px-6 py-2 border border-border text-sm font-body tracking-wide text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <CategorySection id="rings" title="Rings" products={allProducts.rings} />
      <div className="border-t border-border" />
      <CategorySection id="earrings" title="Earrings" products={allProducts.earrings} />
      <div className="border-t border-border" />
      <CategorySection id="bracelets" title="Bracelets" products={allProducts.bracelets} />
      <div className="border-t border-border" />
      <CategorySection id="necklaces" title="Necklaces" products={allProducts.necklaces} />

      <Footer />
    </div>
  );
};

export default Shop;
