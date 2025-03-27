"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { RefreshCw } from "lucide-react";
import { PriceFilter } from "./price-filter";
import ProductsActiveFilters from "./properties-active-filters";
import { SearchFilter } from "./search-filter";

// Default filter values as constants
const DEFAULT_FILTER_VALUES = {
  MIN_PRICE: 100000,
  MAX_PRICE: 5000000,
  PAGE: 0,
  PAGE_SIZE: 10,
};

// Props interface to make the component configurable
interface PropertiesFiltersProps {
  defaultMinPrice?: number;
  defaultMaxPrice?: number;
  defaultPageSize?: number;
}

export function PropertiesFilters({
  defaultMinPrice = DEFAULT_FILTER_VALUES.MIN_PRICE,
  defaultMaxPrice = DEFAULT_FILTER_VALUES.MAX_PRICE,
  defaultPageSize = DEFAULT_FILTER_VALUES.PAGE_SIZE,
}: PropertiesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearchQuery = searchParams?.get("search") || "";
  const initialMinPrice = searchParams?.get("minPrice")
    ? Number.parseInt(searchParams?.get("minPrice") as string)
    : defaultMinPrice;
  const initialMaxPrice = searchParams?.get("maxPrice")
    ? Number.parseInt(searchParams.get("maxPrice") as string)
    : defaultMaxPrice;
  const initialPage = searchParams?.get("page")
    ? Number.parseInt(searchParams.get("page") as string)
    : DEFAULT_FILTER_VALUES.PAGE;
  const initialPageSize = searchParams?.get("pageSize")
    ? Number.parseInt(searchParams.get("pageSize") as string)
    : defaultPageSize;

  const [filters, setFilters] = useState<{
    searchQuery: string;
    priceRange: number[];
    page: number;
    pageSize: number;
  }>({
    searchQuery: initialSearchQuery,
    priceRange: [initialMinPrice, initialMaxPrice],
    page: initialPage,
    pageSize: initialPageSize,
  });

  // Create a memoized derived filter object
  const derivedFilters = useMemo(() => {
    return {
      search: filters.searchQuery,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      page: filters.page,
      pageSize: filters.pageSize,
      hasActiveFilters:
        filters.searchQuery !== "" ||
        filters.priceRange[0] !== defaultMinPrice ||
        filters.priceRange[1] !== defaultMaxPrice ||
        filters.page !== DEFAULT_FILTER_VALUES.PAGE,
    };
  }, [
    filters.searchQuery,
    filters.priceRange,
    filters.page,
    filters.pageSize,
    defaultMinPrice,
    defaultMaxPrice,
  ]);

  const resetAllFilters = () => {
    setFilters({
      searchQuery: "",
      priceRange: [defaultMinPrice, defaultMaxPrice],
      page: DEFAULT_FILTER_VALUES.PAGE,
      pageSize: defaultPageSize,
    });
    router.replace("/properties");
  };

  const resetFilter = (
    filterType: "search" | "category" | "price" | "pagination"
  ) => {
    switch (filterType) {
      case "search":
        setFilters({ ...filters, searchQuery: "" });
        break;
      case "price":
        setFilters({
          ...filters,
          priceRange: [defaultMinPrice, defaultMaxPrice],
        });
        break;
      case "pagination":
        setFilters({ ...filters, page: DEFAULT_FILTER_VALUES.PAGE });
        break;
    }
  };

  // Use the memoized filter object in useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams?.toString() || "");

      // Handle search parameter
      if (derivedFilters.search) {
        newParams.set("search", derivedFilters.search);
      } else {
        newParams.delete("search");
      }

      // Handle price parameters
      if (
        derivedFilters.minPrice !== defaultMinPrice ||
        derivedFilters.maxPrice !== defaultMaxPrice
      ) {
        newParams.set("minPrice", derivedFilters.minPrice.toString());
        newParams.set("maxPrice", derivedFilters.maxPrice.toString());
      } else {
        newParams.delete("minPrice");
        newParams.delete("maxPrice");
      }

      // Handle pagination parameters
      newParams.set("page", derivedFilters.page.toString());

      if (derivedFilters.pageSize !== defaultPageSize) {
        newParams.set("pageSize", derivedFilters.pageSize.toString());
      } else {
        newParams.delete("pageSize");
      }

      router.replace(`?${newParams.toString()}`);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    derivedFilters,
    router,
    searchParams,
    defaultMinPrice,
    defaultMaxPrice,
    defaultPageSize,
  ]);

  return (
    <Card className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        {derivedFilters.hasActiveFilters && (
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
          setFilters({
            ...filters,
            searchQuery: value,
            page: DEFAULT_FILTER_VALUES.PAGE,
          })
        }
      />
      <Separator />

      <PriceFilter
        priceRange={[filters.priceRange[0], filters.priceRange[1]]}
        setPriceRange={
          (value) =>
            setFilters({
              ...filters,
              priceRange: value,
              page: DEFAULT_FILTER_VALUES.PAGE,
            }) // Reset page when price changes
        }
      />
    </Card>
  );
}
