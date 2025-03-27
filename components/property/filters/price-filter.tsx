import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/utils/format";

export function PriceFilter({
  priceRange,
  setPriceRange,
}: {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="font-medium">Price Range</h3>
        <span className="text-sm text-muted-foreground flex justify-between">
          {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
        </span>
      </div>
      <Slider
        min={100000}
        max={5000000}
        step={50000}
        value={priceRange}
        onValueChange={(val) => setPriceRange([val[0], val[1]])}
        className="py-4"
        aria-label="Price range picker"
      />
    </div>
  );
}
