"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CategorySkeleton = () => {
  // Fake 6 skeleton items (you can adjust the count)
  const skeletons = Array.from({ length: 6 });

  return (
    <div>
      <h2 className="text-xl md:text-3xl font-bold mb-11">All Categories</h2>
      <div className="px-14">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {skeletons.map((_, i) => (
              <CarouselItem
                key={i}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategorySkeleton;
