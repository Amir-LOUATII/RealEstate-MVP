import Properties from "@/components/property/properties";
import { PropertiesPageSkeleton } from "@/components/property/properties-page-skeleton";
import { PropertiesQueryParams } from "@/lib/types";
import { Suspense } from "react";

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: PropertiesQueryParams;
}) {
  return (
    <section className=" page w-full ">
      <div className="container mx-auto">
        <Suspense fallback={<PropertiesPageSkeleton />}>
          <Properties searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
