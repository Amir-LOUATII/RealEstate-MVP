"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Printer, Calculator } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Property } from "@prisma/client";

interface PropertyActionsProps {
  property: Property;
}

export function PropertyActions({ property }: PropertyActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // toast({
    //   title: isFavorite ? "Removed from favorites" : "Added to favorites",
    //   description: isFavorite
    //     ? "This property has been removed from your favorites"
    //     : "This property has been added to your favorites",
    // });
  };

  const shareProperty = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      //   toast({
      //     title: "Link copied",
      //     description: "Property link copied to clipboard",
      //   });
    }
  };

  const printProperty = () => {
    window.print();
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="icon"
                  className="w-full"
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-primary-foreground" : ""
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorite ? "Remove from favorites" : "Save to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={shareProperty}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share property</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={printProperty}
                >
                  <Printer className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => {
                    // toast({
                    //   title: "Mortgage Calculator",
                    //   description:
                    //     "Mortgage calculator will open in a new window",
                    // });
                  }}
                >
                  <Calculator className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mortgage calculator</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
