import { Slider } from "@/components/ui/slider";

export function PriceFilter({
  priceRange,
  setPriceRange,
}: {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Price Range</h3>
        <span className="text-sm text-muted-foreground">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        min={0}
        max={2000}
        step={50}
        value={priceRange}
        onValueChange={(val) => setPriceRange([val[0], val[1]])}
        className="py-4"
        aria-label="Price range picker"
      />
    </div>
  );
}
