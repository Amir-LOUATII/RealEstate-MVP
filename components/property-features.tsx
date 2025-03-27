import type { Feature } from "@prisma/client";
import { Check, Info } from "lucide-react";

interface PropertyFeaturesProps {
  features: Feature[] | undefined;
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  // Handle empty or undefined features
  if (!features || features.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
        <div className="flex items-center gap-2 text-muted-foreground border rounded-md p-4 bg-muted/20">
          <Info className="h-5 w-5" />
          <p>No features or amenities have been specified for this property.</p>
        </div>
      </div>
    );
  }

  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const categories = Object.keys(groupedFeatures);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-medium text-lg mb-2 text-primary">
              {category}
            </h3>
            <ul className="space-y-2">
              {groupedFeatures[category].map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
