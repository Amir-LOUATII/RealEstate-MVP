import { Property } from "@prisma/client";
import { PropertyCard } from "../property-card";

function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => {
        return (
          <PropertyCard key={"product" + property.id} property={property} />
        );
      })}
    </div>
  );
}

export default PropertyGrid;
