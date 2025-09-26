"use client";

import { Card, CardContent } from "@/components/ui/card";

const NewArrivalsSkeleton = () => {
  const skeletons = Array.from({ length: 3 });

  return (
    <section className="my-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center mb-8">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid of skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletons.map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden group border border-gray-200"
            >
              {/* Image skeleton */}
              <div className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 animate-pulse" />

                {/* Badge placeholder */}
                <div className="absolute top-3 left-3 h-6 w-12 bg-gray-300 rounded animate-pulse" />

                {/* Rating placeholder */}
                <div className="absolute bottom-3 left-3 h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />

                {/* Description */}
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-4">
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSkeleton;
