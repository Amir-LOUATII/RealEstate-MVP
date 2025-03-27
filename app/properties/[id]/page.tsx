import { PropertyGallery } from "@/components/property-gallery";
import { PropertyInfo } from "@/components/property-info";

import { AgentCard } from "@/components/agent-card";
import { ContactForm } from "@/components/contact-form";
import { PropertyActions } from "@/components/property-actions";
import { PropertyFeatures } from "@/components/property-features";
import { PropertyLocation } from "@/components/property-location";
import { Separator } from "@/components/ui/separator";
import { getPropertyById } from "@/lib/actions/property-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return notFound();
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 mx-auto">
        <Link
          href="/properties"
          className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all properties
        </Link>

        <PropertyGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyInfo property={property} />
            <Separator />
            <PropertyFeatures features={property.features} />
            <Separator />
            <PropertyLocation
              address={property.address}
              city={property.city}
              state={property.state}
              zipCode={property.zipCode}
            />
          </div>

          <div className="space-y-6">
            <PropertyActions property={property} />
            <AgentCard agent={property.agent} />
            <ContactForm propertyId={property.id} agentId={property.agentId} />
          </div>
        </div>

        {/* {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <SimilarProperties properties={similarProperties} />
          </div>
        )} */}
      </div>
    </div>
  );
}
