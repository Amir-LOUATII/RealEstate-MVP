"use client";

import { Badge } from "@/components/ui/badge";
import { PropertyStatus } from "@prisma/client";
import { X } from "lucide-react";

interface Filters {
  searchQuery: string | null;
  selectedStatus: PropertyStatus | "";
  priceRange: number[];
}

interface ActiveFiltersProps {
  filters: Filters;
  onResetFilter: (filterType: "search" | "status" | "price") => void;
}

export default function PropertiesActiveFilters({
  filters,
  onResetFilter,
}: ActiveFiltersProps) {
  const { searchQuery, priceRange, selectedStatus } = filters;

  const hasActiveFilters =
    searchQuery || priceRange[0] !== 0 || priceRange[1] !== 2000;

  if (!hasActiveFilters) {
    return (
      <div className="text-sm text-muted-foreground">No active filters</div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-2">
      <span className="text-sm text-muted-foreground pt-0.5">
        Active filters:
      </span>
      <div className="flex flex-wrap gap-2">
        {/* Display search query filter if it exists */}
        {searchQuery && (
          <Badge
            variant="outline"
            className="bg-primary/5 pl-3 pr-2 py-1.5 flex items-center gap-1 group"
          >
            <span>Search: {searchQuery}</span>
            <button
              onClick={() => onResetFilter("search")}
              className="ml-1 rounded-full hover:bg-primary/10 p-0.5 transition-colors"
              aria-label="Remove search filter"
            >
              <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </Badge>
        )}

        {/* Display price range filter if it's not the default */}
        {(priceRange[0] !== 0 || priceRange[1] !== 2000) && (
          <Badge
            variant="outline"
            className="bg-primary/5 pl-3 pr-2 py-1.5 flex items-center gap-1 group"
          >
            <span>
              Price: ${priceRange[0]} - ${priceRange[1]}
            </span>
            <button
              onClick={() => onResetFilter("price")}
              className="ml-1 rounded-full hover:bg-primary/10 p-0.5 transition-colors"
              aria-label="Remove price filter"
            >
              <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </Badge>
        )}
        {selectedStatus && (
          <Badge
            variant="outline"
            className="bg-primary/5 capitalize pl-3 pr-2 py-1.5 flex items-center gap-1 group"
          >
            <span>
              Status: {selectedStatus.replaceAll("_", " ")?.toLowerCase()}
            </span>
            <button
              onClick={() => onResetFilter("status")}
              className="ml-1 rounded-full hover:bg-primary/10 p-0.5 transition-colors"
              aria-label="Remove category filter"
            >
              <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </Badge>
        )}
      </div>
    </div>
  );
}
