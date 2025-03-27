import { Property } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Calendar, MapPin } from "lucide-react";
import { formatStatus } from "@/utils/format";

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-muted-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}, {property.city}, {property.state}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            ${property.price.toLocaleString()}
          </p>
          <Badge className="mt-2">{formatStatus(property.status)}</Badge>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <Bed className="h-5 w-5 mr-2" />
          <span>{property.bedrooms} Beds</span>
        </div>
        <div className="flex items-center">
          <Bath className="h-5 w-5 mr-2" />
          <span>{property.bathrooms} Baths</span>
        </div>
        <div className="flex items-center">
          <Square className="h-5 w-5 mr-2" />
          <span>{property.squareFeet.toLocaleString()} sq ft</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span>Built {property.yearBuilt}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-muted-foreground">{property.description}</p>
      </div>
    </div>
  );
}
