import { getAllProperties } from "@/lib/actions/property-actions";
import React from "react";
import PropertyGrid from "./property-grid";
import { PropertiesFilters } from "./filters/properties-filter";
import { PropertiesQueryParams } from "@/lib/types";
import PropertiesPagination from "./property-pagination";

export default async function Properties({
  searchParams,
}: {
  searchParams: PropertiesQueryParams;
}) {
  const properties = await getAllProperties({ ...searchParams });

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 pt-5
    "
    >
      <PropertiesFilters />
      <div className="w-full">
        <PropertyGrid properties={properties.properties} />
        <PropertiesPagination
          totalPages={properties?.pagination?.totalPages}
          currentPage={properties?.pagination?.currentPage}
          pageSize={properties?.pagination?.pageSize}
        />
      </div>
    </div>
  );
}
