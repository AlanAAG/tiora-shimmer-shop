import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CollectionFilterProps {
  productCount: number;
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const CollectionFilter = ({ productCount, filters, activeFilter, onFilterChange }: CollectionFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-4 py-6 bg-background">
      {/* Horizontal scrollable filter tabs */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2.5 rounded-lg border text-sm font-body whitespace-nowrap transition-all ${
              activeFilter === filter
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="border-t border-border pt-4 mt-2">
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
    </div>
  );
};

export default CollectionFilter;
