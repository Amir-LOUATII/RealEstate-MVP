import React from "react";
import { PropertyCard } from "../property-card";
import { getFeaturedProperties } from "@/lib/actions/property-actions";

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties();
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.splice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
