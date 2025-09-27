"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          <Card className="relative aspect-square overflow-hidden rounded-xl border">
            <Skeleton className="h-full w-full" />
          </Card>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-auto pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 w-20 flex-shrink-0 rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>

            <Skeleton className="h-8 w-2/3 mb-3" />

            <div className="flex items-center gap-4 mt-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>

          <Separator />

          <Skeleton className="h-16 w-full" />

          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-5 w-24" />
            <Separator orientation="vertical" className="h-4" />
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center border rounded-md w-36 px-2">
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 flex-1" />
          </div>

          <Separator />

          <div className="grid gap-4 text-sm">
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16">
        <Skeleton className="h-7 w-60 mb-4" />
        <Separator className="mb-6" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
