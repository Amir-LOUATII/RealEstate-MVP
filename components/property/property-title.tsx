import { Building, Home } from "lucide-react";

interface PropertiesTitleProps {
  totalProperties?: number;
}

export function PropertiesTitle({ totalProperties }: PropertiesTitleProps) {
  return (
    <div className="w-full mb-8">
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 rounded-lg border">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-primary/20">
          <Building className="h-24 w-24 opacity-20" />
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-medium text-primary">
              Premium Properties
            </h2>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Find Your Perfect Property Investment
          </h1>

          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Discover exceptional real estate opportunities in prime locations.
            Browse our curated selection of{" "}
            {totalProperties ? `${totalProperties}+ ` : ""}properties and secure
            your future with a sound investment today.
          </p>

          {totalProperties && (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {totalProperties}+ listings
              </span>
              <span>Updated daily</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
