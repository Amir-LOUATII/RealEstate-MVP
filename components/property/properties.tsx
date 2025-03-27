import { getAllProperties } from "@/lib/actions/property-actions";
import React from "react";
import PropertyGrid from "./property-grid";
import { PropertiesFilters } from "./filters/properties-filters";
import { PropertiesQueryParams } from "@/lib/types";
import PropertiesPagination from "./property-pagination";
import { PropertiesTitle } from "./property-title";
import { NoPropertiesFound } from "./not-properties-found";

export default async function Properties({
  searchParams,
}: {
  searchParams: PropertiesQueryParams;
}) {
  const properties = await getAllProperties({ ...searchParams });
  const isFiltered =
    !!searchParams.maxPrice ||
    !!searchParams.minPrice ||
    !!searchParams.search ||
    !!searchParams.status;
  return (
    <div className="w-full py-12">
      <PropertiesTitle totalProperties={properties.pagination.totalCount} />
      <div
        className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 pt-5
      "
      >
        <PropertiesFilters />
        <div className="w-full">
          <PropertyGrid properties={properties.properties} />
          {properties.properties.length > 0 ? (
            <PropertiesPagination
              totalPages={properties?.pagination?.totalPages}
              currentPage={properties?.pagination?.currentPage}
              pageSize={properties?.pagination?.pageSize}
            />
          ) : (
            <NoPropertiesFound isFiltered={isFiltered} />
          )}
        </div>
      </div>
    </div>
  );
}
