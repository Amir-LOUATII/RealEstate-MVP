import { getAllProperties } from "@/lib/actions/property-actions";
import React from "react";
import PropertyGrid from "./property-grid";
import { PropertiesFilters } from "./filters/properties-filter";
import { PropertiesQueryParams } from "@/lib/types";

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
      <PropertyGrid properties={properties.properties} />;
    </div>
  );
}
