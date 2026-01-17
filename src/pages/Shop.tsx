import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { allProducts, formatPrice, Product } from "@/data/products";

interface ProductWithSlug extends Product {
  slug: string;
}

const productsByCategory = {
  rings: allProducts.filter(p => p.category === "rings"),
  earrings: allProducts.filter(p => p.category === "earrings"),
  bracelets: allProducts.filter(p => p.category === "bracelets"),
  necklaces: allProducts.filter(p => p.category === "necklaces"),
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.slug}`} className="group cursor-pointer block">
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
    </div>
    <div className="text-center">
      <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="font-body text-sm text-muted-foreground">
        {formatPrice(product.price)}
      </p>
    </div>
  </Link>
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
      <CategorySection id="rings" title="Rings" products={productsByCategory.rings} />
      <div className="border-t border-border" />
      <CategorySection id="earrings" title="Earrings" products={productsByCategory.earrings} />
      <div className="border-t border-border" />
      <CategorySection id="bracelets" title="Bracelets" products={productsByCategory.bracelets} />
      <div className="border-t border-border" />
      <CategorySection id="necklaces" title="Necklaces" products={productsByCategory.necklaces} />

      <Footer />
    </div>
  );
};

export default Shop;
