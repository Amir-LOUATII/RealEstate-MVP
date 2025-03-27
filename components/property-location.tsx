import { MapPin, Home, Building, MapPinned } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyLocationProps {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;
}

export function PropertyLocation({
  address,
  city,
  state,
  zipCode,
  neighborhood,
}: PropertyLocationProps) {
  // Ensure all required address components are present
  const hasValidAddress = address && city && state && zipCode;
  const fullAddress = hasValidAddress
    ? `${address}, ${city}, ${state} ${zipCode}`
    : "Address information incomplete";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Address information */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-medium mb-1">Property Address</h3>
              <p
                className={`${
                  !hasValidAddress
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {fullAddress}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Building className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">City</h4>
                  <p className="text-sm text-muted-foreground">
                    {city || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Home className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Neighborhood</h4>
                  <p className="text-sm text-muted-foreground">
                    {neighborhood || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPinned className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">State</h4>
                  <p className="text-sm text-muted-foreground">
                    {state || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Zip Code</h4>
                  <p className="text-sm text-muted-foreground">
                    {zipCode || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simple location illustration */}
          <div className="hidden md:flex items-center justify-center bg-muted/30 rounded-lg p-6 min-w-[200px]">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-primary/70" />
              <p className="text-sm text-muted-foreground mt-2">
                {city}, {state}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
