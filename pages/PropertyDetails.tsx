import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Bath, 
  Square,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

// Mock data - replace with API call
const mockProperty = {
  id: "1",
  title: "Luxury Waterfront Villa",
  description: "Beautiful waterfront property with stunning views. This exceptional home features high-end finishes, an open floor plan, and direct access to the water. Perfect for those seeking luxury living in a prime location.",
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
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613545325268-d8e2fb3d4cc9?auto=format&fit=crop&q=80"
  ],
  amenities: ["Pool", "Garden", "Garage", "Security System", "Central AC"],
  status: "for-sale",
  listedDate: "2024-03-15",
  agent: {
    id: "a1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-0123",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  }
};

export function PropertyDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2">
                <img
                  src={mockProperty.images[0]}
                  alt={mockProperty.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              {mockProperty.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${mockProperty.title} ${index + 2}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{mockProperty.title}</h1>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockProperty.location.address}, {mockProperty.location.city}, {mockProperty.location.state}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    ${mockProperty.price.toLocaleString()}
                  </p>
                  <Badge className="mt-2">{mockProperty.status === 'for-sale' ? 'For Sale' : 'Sold'}</Badge>
                </div>
              </div>

              {/* Features */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2" />
                  <span>{mockProperty.features.bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2" />
                  <span>{mockProperty.features.bathrooms} Baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2" />
                  <span>{mockProperty.features.squareFeet.toLocaleString()} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Built {mockProperty.features.yearBuilt}</span>
                </div>
              </div>

              {/* Description */}
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground mb-6">{mockProperty.description}</p>

              {/* Amenities */}
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {mockProperty.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={mockProperty.agent.image}
                  alt={mockProperty.agent.name}
                  className="h-16 w-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{mockProperty.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  {mockProperty.agent.phone}
                </Button>
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}