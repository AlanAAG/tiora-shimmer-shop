import { Product } from "@/data/products";

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      {/* Top two vertical images */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={`${product.name} - View 1`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 z-10 bg-foreground/90 text-background text-[10px] tracking-widest uppercase px-3 py-1.5 font-body">
              Best Seller
            </span>
          )}
          <img
            src={product.images[1]}
            alt={`${product.name} - View 2`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2x2 Grid of images */}
      <div className="grid grid-cols-2 gap-4">
        {product.images.slice(2, 6).map((image, index) => (
          <div key={index} className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={image}
              alt={`${product.name} - View ${index + 3}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
