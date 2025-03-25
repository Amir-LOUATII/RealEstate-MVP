import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Search } from "lucide-react";

// Mock data - replace with actual API call
const mockProperties = [
  {
    id: "1",
    title: "Luxury Waterfront Villa",
    description: "Beautiful waterfront property with stunning views",
    price: 1250000,
    location: {
      address: "123 Ocean Drive",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 3200,
      yearBuilt: 2020,
      propertyType: "house"
    },
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"],
    amenities: ["Pool", "Garden", "Garage"],
    status: "for-sale",
    listedDate: "2024-03-15",
    agent: {
      id: "a1",
      name: "John Smith",
      email: "john@example.com",
      phone: "555-0123",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    }
  },
  // Add more mock properties here
] as const;

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Dream Home
          </h1>
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input
              placeholder="Search by location, property type, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/90"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}