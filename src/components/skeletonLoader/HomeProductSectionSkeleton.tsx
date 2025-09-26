"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = {
  title?: string;
  showButton?: boolean;
  items?: number; // how many skeleton cards (default 5 like xl:grid-cols-5)
};

const HomeProductSectionSkeleton = ({
  title = "Loading...",
  showButton = true,
  items = 5,
}: Props) => {
  const skeletons = Array.from({ length: items });

  return (
    <div className="my-10">
      {/* Header */}
      <div className="flex justify-between items-top">
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-6" />
        {showButton && (
          <div
            className={cn(
              buttonVariants({ variant: "outline" }),
              "pointer-events-none"
            )}
          >
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        )}
      </div>

      {/* Product Grid Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 2xl:gap-8">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="relative rounded-lg overflow-hidden border group flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-video bg-gray-200 animate-pulse" />

            {/* Info */}
            <div className="px-4 mt-2 space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProductSectionSkeleton;
