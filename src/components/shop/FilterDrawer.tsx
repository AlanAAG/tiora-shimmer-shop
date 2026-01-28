import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterDrawerProps {
  productCount: number;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  showCategoryFilter: boolean;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

type CollectionType = "all" | "best-sellers" | "rings" | "earrings" | "bracelets" | "necklaces";

const collections: { value: CollectionType; label: string }[] = [
  { value: "all", label: "All Items" },
  { value: "best-sellers", label: "Best Sellers" },
  { value: "rings", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "necklaces", label: "Necklaces" },
];

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "necklaces", label: "Necklaces" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const FilterDrawer = ({ 
  productCount, 
  categoryFilter, 
  onCategoryChange,
  showCategoryFilter,
  sortOption,
  onSortChange,
}: FilterDrawerProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const currentCollection = searchParams.get("collection") || "all";

  const handleCollectionChange = (collection: string) => {
    if (collection === "all") {
      searchParams.delete("collection");
    } else {
      searchParams.set("collection", collection);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4 bg-background flex items-center justify-between">
      {/* Product count */}
      <p className="font-body text-sm text-muted-foreground">{productCount} items</p>

      {/* Filter button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm font-body hover:bg-muted transition-colors">
            <span>Filter & Sort</span>
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] bg-background p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b border-border shrink-0">
            <SheetTitle className="font-display text-lg">Filter & Sort</SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="flex-1 px-6">
            <div className="py-6 space-y-8">
              {/* Collections */}
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Collections
                </h3>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <button
                      key={collection.value}
                      onClick={() => {
                        handleCollectionChange(collection.value);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        currentCollection === collection.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <span>{collection.label}</span>
                      {currentCollection === collection.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filter - only show for all/best-sellers */}
              {showCategoryFilter && (
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categoryFilters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => onCategoryChange(filter.value)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          categoryFilter === filter.value
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span>{filter.label}</span>
                        {categoryFilter === filter.value && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort options */}
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Sort By
                </h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSortChange(option.value)}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        sortOption === option.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortOption === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterDrawer;
