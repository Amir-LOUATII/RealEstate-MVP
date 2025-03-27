import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import Hero from "@/components/home/Hero";

export default async function HomePage() {
  // const properties = await prisma.property.findMany({
  //   take: 6,
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   include: {
  //     agent: true,
  //   },
  // });
  const properties = [
    {
      id: "1",
      title: "Beautiful Family Home",
      address: "123 Main St",
      description: "A lovely family home with a spacious garden.",
      price: 500000,
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      yearBuilt: 1995,
      agentId: "agent1",
      agent: {
        name: "John Doe",
        image: "https://example.com/agent.jpg",
      },
      images: ["https://example.com/property.jpg"],
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Featured Properties */}
    </div>
  );
}
