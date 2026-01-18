import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";

const collections = [
  { id: "all", name: "All Items" },
  { id: "best-sellers", name: "Best Sellers" },
  { id: "bracelets", name: "Bracelets" },
  { id: "necklaces", name: "Necklaces" },
  { id: "earrings", name: "Earrings" },
];

interface Product {
  id: number;
  name: string;
  material: string;
  price: number;
  comparePrice: number;
  image: string;
  discount: string;
  badge?: string;
}

// Mock products - will be replaced with Shopify data
const mockProducts: Record<string, Product[]> = {
  "all": [
    { id: 1, name: "Serpentine Ring", material: "18k Gold Plated", price: 4500, comparePrice: 6000, image: productRing, discount: "25% OFF", badge: "BEST SELLER" },
    { id: 2, name: "Pearl Drop Earrings", material: "Silver Plated", price: 3200, comparePrice: 4200, image: productEarrings, discount: "25% OFF", badge: "NEW" },
    { id: 3, name: "Chain Link Bracelet", material: "18k Gold Plated", price: 5500, comparePrice: 7300, image: productBracelet, discount: "25% OFF", badge: "BEST SELLER" },
    { id: 4, name: "Layered Necklace", material: "Gold Tone", price: 6800, comparePrice: 9000, image: productNecklace, discount: "25% OFF" },
  ],
  "best-sellers": [
    { id: 1, name: "Serpentine Ring", material: "18k Gold Plated", price: 4500, comparePrice: 6000, image: productRing, discount: "25% OFF", badge: "BEST SELLER" },
    { id: 3, name: "Chain Link Bracelet", material: "18k Gold Plated", price: 5500, comparePrice: 7300, image: productBracelet, discount: "25% OFF", badge: "BEST SELLER" },
  ],
  "bracelets": [
    { id: 3, name: "Chain Link Bracelet", material: "18k Gold Plated", price: 5500, comparePrice: 7300, image: productBracelet, discount: "25% OFF", badge: "BEST SELLER" },
  ],
  "necklaces": [
    { id: 4, name: "Layered Necklace", material: "Gold Tone", price: 6800, comparePrice: 9000, image: productNecklace, discount: "25% OFF" },
  ],
  "earrings": [
    { id: 2, name: "Pearl Drop Earrings", material: "Silver Plated", price: 3200, comparePrice: 4200, image: productEarrings, discount: "25% OFF", badge: "NEW" },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const MostPopular = () => {
  const [activeCollection, setActiveCollection] = useState("all");
  const products = mockProducts[activeCollection as keyof typeof mockProducts] || [];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-3">
            Most Popular
          </h2>
          <p className="font-body text-muted-foreground">
            Elevate your style with our latest designs.
          </p>
        </div>

        {/* Collection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.id)}
              className={`px-5 py-2.5 font-body text-sm border transition-all duration-300 ${
                activeCollection === collection.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
              }`}
            >
              {collection.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-card rounded-sm overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.badge && (
                    <span className="bg-background/90 text-foreground text-[10px] font-body uppercase tracking-wider px-2 py-1">
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-destructive text-destructive-foreground text-[10px] font-body uppercase tracking-wider px-2 py-1">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Quick Add Button */}
                <button className="absolute bottom-3 right-3 w-8 h-8 bg-background/90 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-body text-sm font-medium text-foreground truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product.material}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted-foreground line-through text-xs">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="text-foreground font-medium text-sm">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-xs text-primary mt-1">
                  with 25% off auto-applied
                </p>
                
                {/* Material Options */}
                <div className="flex gap-1.5 mt-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border border-foreground/20" />
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-foreground/20" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Shop Collection Button */}
        <Button 
          variant="outline" 
          className="w-full max-w-2xl mx-auto flex uppercase tracking-widest text-xs h-14"
          asChild
        >
          <Link to={`/shop?collection=${activeCollection}`}>
            Shop {collections.find(c => c.id === activeCollection)?.name}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default MostPopular;
