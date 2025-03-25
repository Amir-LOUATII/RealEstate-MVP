import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

// Mock data - replace with API calls
const mockProperties = [
  {
    id: "1",
    title: "Luxury Waterfront Villa",
    price: 1250000,
    location: {
      city: "Miami",
      state: "FL"
    },
    status: "for-sale"
  },
  // Add more properties here
];

export function AdminPanel() {
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Property Management</h1>
          <Button onClick={() => setIsAddingProperty(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        {isAddingProperty ? (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Property title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input type="number" placeholder="Price" />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input placeholder="Street address" />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input placeholder="City" />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input placeholder="State" />
                </div>
                <div>
                  <label className="text-sm font-medium">Zip Code</label>
                  <Input placeholder="Zip code" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Property description" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingProperty(false)}>
                  Cancel
                </Button>
                <Button>Save Property</Button>
              </div>
            </form>
          </Card>
        ) : null}

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.location.city}, {property.location.state}</TableCell>
                  <TableCell>${property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}