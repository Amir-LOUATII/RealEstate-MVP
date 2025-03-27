"use client";

import { MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyLocationProps {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export function PropertyLocation({
  address,
  city,
  state,
  zipCode,
}: PropertyLocationProps) {
  const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodedAddress}&key=YOUR_API_KEY`;

  // For demo purposes, use a placeholder map
  const placeholderMap = `/placeholder.svg?height=300&width=600&text=Map+of+${encodeURIComponent(
    city
  )}+${encodeURIComponent(state)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={placeholderMap || "/placeholder.svg"}
            alt={`Map showing ${fullAddress}`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-medium mb-2">Property Address</h3>
          <p className="text-muted-foreground">{fullAddress}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Neighborhood</h4>
              <p className="text-sm text-muted-foreground">{city}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Zip Code</h4>
              <p className="text-sm text-muted-foreground">{zipCode}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
