"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatStatus } from "@/utils/format";
import { PropertyStatus } from "@prisma/client";

interface StatusFilterProps {
  selectedStatus: PropertyStatus | "";
  setSelectedStatus: (value: PropertyStatus | null) => void;
  status: PropertyStatus[];
}

export function StatusFilter({
  selectedStatus,
  setSelectedStatus,
  status,
}: StatusFilterProps) {
  const statusOptions = status.map((status) => ({
    label: formatStatus(status),
    value: status,
  }));

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Status</h3>
      <Select
        value={selectedStatus || ""}
        onValueChange={(value) => {
          if (value === "all") {
            setSelectedStatus(null);
          } else {
            setSelectedStatus(value as PropertyStatus);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>

        <SelectContent>
          {/* "All Categories" option */}
          <SelectItem value="all">All Categories</SelectItem>
          {/* Dynamically generated category options */}
          {statusOptions.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
              className="capitalize"
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
