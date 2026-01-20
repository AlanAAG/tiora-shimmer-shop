import { ShopifyProduct } from "@/lib/shopify";

interface ShopifyImageGalleryProps {
  product: ShopifyProduct['node'];
}

export const ShopifyImageGallery = ({ product }: ShopifyImageGalleryProps) => {
  const images = product.images.edges.map(edge => edge.node);
  
  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main grid layout */}
      <div className="grid grid-cols-2 gap-4">
        {images.slice(0, 2).map((image, index) => (
          <div key={index} className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
            <img
              src={image.url}
              alt={image.altText || `${product.title} - View ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Additional images */}
      {images.length > 2 && (
        <div className="grid grid-cols-2 gap-4">
          {images.slice(2, 6).map((image, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg">
              <img
                src={image.url}
                alt={image.altText || `${product.title} - View ${index + 3}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
