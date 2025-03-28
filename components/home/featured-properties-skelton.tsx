import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FeaturedPropertiesSkelton() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="w-full h-20" />
        </div>
      </div>
    </section>
  );
}
