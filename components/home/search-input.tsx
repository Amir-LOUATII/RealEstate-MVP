import React from "react";
import FormContainer from "../form/FormContainer";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { searchProperty } from "@/lib/actions/property-actions";

export default function SearchInput() {
  return (
    <FormContainer action={searchProperty}>
      <div className="max-w-2xl mx-auto flex gap-2">
        <Input
          name="search"
          placeholder="Search by location, property type, or features..."
          className="bg-white/90"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </FormContainer>
  );
}
