import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import productNecklace from "@/assets/product-necklace.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productEarrings from "@/assets/product-earrings.jpg";
import productRing from "@/assets/product-ring.jpg";

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
const products: Product[] = [
  { id: 1, name: "Serpentine Ring", material: "18k Gold Plated", price: 4500, comparePrice: 6000, image: productRing, discount: "25%", badge: "Best Seller" },
  { id: 2, name: "Pearl Drop Earrings", material: "Silver Plated", price: 3200, comparePrice: 4200, image: productEarrings, discount: "25%", badge: "Best Seller" },
  { id: 3, name: "Chain Link Bracelet", material: "18k Gold Plated", price: 5500, comparePrice: 7300, image: productBracelet, discount: "25%", badge: "Best Seller" },
  { id: 4, name: "Layered Necklace", material: "Gold Tone", price: 6800, comparePrice: 9000, image: productNecklace, discount: "25%", badge: "Best Seller" },
  { id: 5, name: "Serpent Earrings", material: "18k Gold Plated", price: 3800, comparePrice: 5000, image: productEarrings, discount: "25%", badge: "Best Seller" },
  { id: 6, name: "Crystal Pendant", material: "Silver Plated", price: 4200, comparePrice: 5600, image: productNecklace, discount: "25%", badge: "Best Seller" },
  { id: 7, name: "Twisted Bangle", material: "18k Gold Plated", price: 4900, comparePrice: 6500, image: productBracelet, discount: "25%", badge: "Best Seller" },
  { id: 8, name: "Statement Ring", material: "Gold Tone", price: 3600, comparePrice: 4800, image: productRing, discount: "25%", badge: "Best Seller" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const MostPopular = () => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-4xl md:text-5xl text-foreground italic mb-3">
            Most Popular
          </h2>
          <p className="font-body text-muted-foreground">
            Elevate your style with our latest designs.
          </p>
        </div>

        {/* Scrollable Products */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 mb-6">
          <div className="flex gap-3 min-w-max" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group flex-shrink-0"
                style={{ width: 'calc(42vw - 1rem)', maxWidth: '280px' }}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges - Single Line */}
                  <div className="absolute top-2 left-2 flex flex-row gap-1.5">
                    <span className="bg-background/90 text-foreground text-xs font-body tracking-wider px-3 py-1 rounded whitespace-nowrap">
                      Best Seller
                    </span>
                    <span className="bg-destructive text-destructive-foreground text-xs font-body tracking-wider px-3 py-1 rounded whitespace-nowrap">
                      25% Off
                    </span>
                  </div>

                  {/* Quick Add Button */}
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-background/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info - Outside the box */}
                <div className="pt-2">
                  <h3 className="font-body text-sm font-medium text-foreground truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {product.material}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-muted-foreground line-through text-xs">
                      {formatPrice(product.comparePrice)}
                    </span>
                    <span className="text-foreground font-medium text-sm">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-xs text-primary mt-0.5">
                    with 25% off auto-applied
                  </p>
                  
                  {/* Material Options */}
                  <div className="flex gap-1.5 mt-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border border-foreground/20" />
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-foreground/20" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Shop Collection Button */}
        <Button 
          variant="outline" 
          className="w-full max-w-xl mx-auto flex uppercase tracking-widest text-xs h-14 rounded-2xl mb-8"
          asChild
        >
          <Link to="/shop?collection=best-sellers">
            Shop Best Sellers
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default MostPopular;