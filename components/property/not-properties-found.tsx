"use client";

import { Button } from "@/components/ui/button";
import { SearchX, Home, RefreshCw } from "lucide-react";

interface NoPropertiesFoundProps {
  isFiltered?: boolean;
  onReset?: () => void;
}

export function NoPropertiesFound({
  isFiltered = false,
  onReset,
}: NoPropertiesFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-muted/30 rounded-full p-6 mb-6">
        {isFiltered ? (
          <SearchX className="h-12 w-12 text-muted-foreground" />
        ) : (
          <Home className="h-12 w-12 text-muted-foreground" />
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-2">
        {isFiltered
          ? "No properties matched your search"
          : "No properties found"}
      </h2>

      <p className="text-muted-foreground max-w-md mb-6">
        {isFiltered
          ? "We couldn't find any properties that match your current filters. Try adjusting your search criteria."
          : "There are currently no properties available in our listings. Please check back later for new properties."}
      </p>

      {isFiltered && onReset && (
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
