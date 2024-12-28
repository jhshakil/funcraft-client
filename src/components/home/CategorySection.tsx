"use client";

import { TCategory } from "@/types/category.type";
import CategoryCard from "../category/CategoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  categories: TCategory[];
};

const CategorySection = ({ categories }: Props) => {
  return (
    <div className="px-14">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories?.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/2 md:basis-1/4 lg:basis-1/6"
            >
              <CategoryCard category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategorySection;
