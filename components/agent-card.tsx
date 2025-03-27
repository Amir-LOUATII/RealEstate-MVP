import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Award, Star } from "lucide-react";
import Image from "next/image";
import { Agent } from "@prisma/client";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 mr-4">
            <Image
              src={agent?.image || "/placeholder.svg?height=64&width=64"}
              alt={agent?.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{agent?.name}</h3>
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">Real Estate Agent</p>
              {agent?.rating && (
                <div className="flex items-center ml-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">
                    {agent?.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {agent?.certifications && (
          <div className="flex items-center mb-4 text-xs">
            <Award className="h-3 w-3 text-primary mr-1" />
            <span>{agent?.certifications}</span>
          </div>
        )}

        {agent?.bio && (
          <p className="text-sm text-muted-foreground mb-4">{agent?.bio}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-muted-foreground">
          <div>
            <p className="font-medium">Experience</p>
            <p>{agent?.yearsOfExperience || 5}+ years</p>
          </div>
          <div>
            <p className="font-medium">Properties Sold</p>
            <p>{agent?.propertiesSold || 50}+</p>
          </div>
          <div>
            <p className="font-medium">Languages</p>
            <p>{agent?.languages || "English"}</p>
          </div>
          <div>
            <p className="font-medium">Response Time</p>
            <p>Within 24 hours</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            {agent?.phone}
          </Button>
          <Button className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Contact Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
