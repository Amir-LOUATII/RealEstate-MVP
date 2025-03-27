import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/featuredProperties";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <Suspense fallback={<p>Loading...</p>}>
        <FeaturedProperties />
      </Suspense>
    </div>
  );
}
