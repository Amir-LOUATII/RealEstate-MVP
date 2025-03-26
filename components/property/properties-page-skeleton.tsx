import { Skeleton } from "../ui/skeleton";

export function PropertiesPageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      <div className="border rounded-lg p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  );
}
