import { Agent, Property } from "@prisma/client";
import { PropertyCard } from "../property-card";
type PropertyWithAgent = Property & {
  agent: Agent;
};
function PropertyGrid({ properties }: { properties: PropertyWithAgent[] }) {
  return (
    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => {
        return (
          <PropertyCard key={"product" + property.id} property={property} />
        );
      })}
    </div>
  );
}

export default PropertyGrid;
