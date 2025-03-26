"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { RefreshCw } from "lucide-react";
import { PriceFilter } from "./price-filter";
import ProductsActiveFilters from "./properties-active-filters";
import { SearchFilter } from "./search-filter";

export function PropertiesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearchQuery = searchParams?.get("search") || "";
  const initialMinPrice = searchParams?.get("minPrice")
    ? Number.parseInt(searchParams?.get("minPrice") as string)
    : 0;
  const initialMaxPrice = searchParams?.get("maxPrice")
    ? Number.parseInt(searchParams.get("maxPrice") as string)
    : 2000;

  const [filters, setFilters] = useState<{
    searchQuery: string;

    priceRange: number[];
  }>({
    searchQuery: initialSearchQuery,

    priceRange: [initialMinPrice, initialMaxPrice],
  });

  const resetAllFilters = () => {
    setFilters({
      searchQuery: "",

      priceRange: [0, 2000],
    });
    router.replace("/");
  };

  const resetFilter = (filterType: "search" | "category" | "price") => {
    switch (filterType) {
      case "search":
        setFilters({ ...filters, searchQuery: "" });
        break;

      case "price":
        setFilters({ ...filters, priceRange: [0, 2000] });
        break;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams ?? {});
      const resetPage = () => newParams.set("page", "0");
      if (filters.searchQuery) {
        newParams.set("search", filters.searchQuery);
        resetPage();
      } else {
        newParams.delete("search");
        resetPage();
      }

      if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000) {
        newParams.set("minPrice", filters.priceRange[0].toString());
        newParams.set("maxPrice", filters.priceRange[1].toString());
        resetPage();
      } else {
        newParams.delete("minPrice");
        newParams.delete("maxPrice");
        resetPage();
      }

      router.replace(`?${newParams.toString()}`);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, router, searchParams]);

  const hasActiveFilters =
    filters.searchQuery ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 2000;

  return (
    <Card className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetAllFilters}
            className="text-xs h-8 gap-1.5"
          >
            <RefreshCw className="h-3 w-3" />
            Reset All
          </Button>
        )}
      </div>

      <ProductsActiveFilters filters={filters} onResetFilter={resetFilter} />

      <Separator />
      <SearchFilter
        searchQuery={filters.searchQuery}
        setSearchQuery={(value: string) =>
          setFilters({ ...filters, searchQuery: value })
        }
      />
      <Separator />

      <PriceFilter
        priceRange={[filters.priceRange[0], filters.priceRange[1]]}
        setPriceRange={(value) => setFilters({ ...filters, priceRange: value })}
      />
    </Card>
  );
}
