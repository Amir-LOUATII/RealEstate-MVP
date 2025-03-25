import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <AspectRatio ratio={16 / 9}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
            <Badge variant={property.status === 'for-sale' ? 'default' : 'secondary'}>
              {property.status === 'for-sale' ? 'For Sale' : 'Sold'}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-primary mb-2">
            ${property.price.toLocaleString()}
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            {property.location.address}, {property.location.city}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.features.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.features.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.features.squareFeet} sq ft</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center">
          <img
            src={property.agent.image}
            alt={property.agent.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="text-sm text-muted-foreground">{property.agent.name}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}