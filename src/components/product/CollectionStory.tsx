import { Product } from "@/data/products";

interface CollectionStoryProps {
  product: Product;
}

export const CollectionStory = ({ product }: CollectionStoryProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl text-foreground italic">
              The Liquid Metal Collection
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                This collection embraces soft, flowing shapes that feel both feminine and bold. 
                A selection of the pieces is highlighted by a natural edged open circle. 
                The organic, fluid lines are a testament to the imperfect perfection that gives 
                these pieces their individual charm.
              </p>
              <p>
                With versatile silhouettes, this collection effortlessly transitions from sunrise 
                to sunset, offering an elegant yet striking look for any occasion. Discover the 
                allure of unique beauty and let each piece speak to your individuality.
              </p>
              <p className="font-medium text-foreground">
                Each piece designed from hand drawing artists in Los Angeles.
              </p>
            </div>
            <h3 className="font-display text-xl text-foreground pt-4">
              More from the Edit
            </h3>
          </div>

          {/* Video Placeholder - Right */}
          <div className="relative aspect-[4/5] bg-muted overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt="Collection video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/10 flex items-end justify-between p-4">
              <button className="w-10 h-10 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
