import React from "react";
import { PropertyCard } from "../property-card";

export default function featuredProperties() {
  const;
  return (
    <section className="py-12">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
