import Properties from "@/components/property/properties";
import { PropertiesPageSkeleton } from "@/components/property/properties-page-skeleton";
import { PropertiesQueryParams } from "@/lib/types";
import { Suspense } from "react";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: PropertiesQueryParams;
}) {
  const params = await searchParams;

  return (
    <section className=" page w-full ">
      <div className="container mx-auto">
        <Suspense fallback={<PropertiesPageSkeleton />}>
          <Properties searchParams={params} />
        </Suspense>
      </div>
    </section>
  );
}
