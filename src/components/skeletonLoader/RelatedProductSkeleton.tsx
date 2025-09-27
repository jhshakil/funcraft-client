"use client";

import { Skeleton } from "@/components/ui/skeleton";

type ProductCardSkeletonProps = {
  viewMode?: "grid" | "grid-dense" | "list";
};

export function ProductCardSkeleton({
  viewMode = "grid",
}: ProductCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="relative flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden p-3">
        {/* Image */}
        <Skeleton className="w-full sm:w-48 h-48" />

        {/* Content */}
        <div className="flex flex-col flex-1 space-y-3">
          <Skeleton className="h-6 w-40" /> {/* Title */}
          <Skeleton className="h-4 w-24" /> {/* Rating */}
          <Skeleton className="h-10 w-full" /> {/* Description */}
          <div className="mt-auto flex items-center justify-between">
            <Skeleton className="h-6 w-20" /> {/* Price */}
            <Skeleton className="h-9 w-24 rounded-md" /> {/* Button */}
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === "grid-dense") {
    return (
      <div className="relative rounded-lg border p-3 flex flex-col h-full">
        {/* Image */}
        <Skeleton className="aspect-square w-full rounded-md" />

        <div className="flex flex-col flex-grow mt-3 space-y-3">
          <Skeleton className="h-5 w-32" /> {/* Title */}
          <div className="mt-auto flex justify-between items-center">
            <Skeleton className="h-4 w-20" /> {/* Rating */}
            <Skeleton className="h-5 w-16" /> {/* Price */}
          </div>
        </div>
      </div>
    );
  }

  // Default grid
  return (
    <div className="relative rounded-lg border flex flex-col">
      <Skeleton className="aspect-video w-full" /> {/* Image */}
      <div className="p-4 space-y-3 flex flex-col flex-grow">
        <Skeleton className="h-5 w-40" /> {/* Title */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" /> {/* Rating */}
          <Skeleton className="h-5 w-16" /> {/* Price */}
        </div>
        <Skeleton className="h-9 w-full rounded-md" /> {/* Add to Cart */}
      </div>
    </div>
  );
}

export default function RelatedProductSkeleton() {
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-56 mb-6" /> {/* Title */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
