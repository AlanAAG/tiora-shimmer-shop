import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CollectionFilterProps {
  productCount: number;
}

const CollectionFilter = ({ productCount }: CollectionFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-4 py-6 bg-background">
      {/* Product count */}
      <p className="font-body text-sm text-foreground mb-3">{productCount} items</p>

      {/* Filter & Sort button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-3 rounded-full border border-border text-foreground font-body"
      >
        <span>Filter & Sort</span>
        {isExpanded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>

      {/* Expandable filter options */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-secondary rounded-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">
              Price: Low to High
            </button>
            <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">
              Price: High to Low
            </button>
            <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">
              Newest First
            </button>
            <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">
              Best Selling
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionFilter;
