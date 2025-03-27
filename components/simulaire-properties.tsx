import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@prisma/client";

interface SimilarPropertiesProps {
  properties: Property[];
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link href={`/properties/${property.id}`} key={property.id}>
          <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <Badge className="absolute top-2 right-2">
                {property.status}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                {property.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                {property.city}, {property.state}
              </p>

              <p className="text-primary font-bold text-lg">
                ${property.price.toLocaleString()}
              </p>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.squareFeet.toLocaleString()} sq ft</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
