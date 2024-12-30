"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { TCategory } from "@/types/category.type";

type Props = {
  categories: TCategory[];
};

const ProductSidebar = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategories = searchParams.get("category")?.split(",") || [];
  const defaultMinPrice = parseFloat(searchParams.get("minPrice") || "10");
  const defaultMaxPrice = parseFloat(searchParams.get("maxPrice") || "5760");

  const [priceRange, setPriceRange] = useState<number[]>([
    defaultMinPrice,
    defaultMaxPrice,
  ]);
  const [selectedCat, setSelectedCat] = useState<string[]>(defaultCategories);

  const toggleCategory = (category: string) => {
    setSelectedCat((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const applyFilters = () => {
    const url = new URL(window.location.href);

    if (selectedCat.length > 0) {
      url.searchParams.set("category", selectedCat.join(","));
    } else {
      url.searchParams.delete("category");
    }

    url.searchParams.set("minPrice", priceRange[0].toString());
    url.searchParams.set("maxPrice", priceRange[1].toString());

    router.push(url.pathname + url.search);
  };

  return (
    <div className="w-full max-w-xs space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Product Categories</h2>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.name}
                  checked={selectedCat.includes(category.name)}
                  onCheckedChange={() => toggleCategory(category.name)}
                  className="rounded-sm border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <label
                  htmlFor={category.name}
                  className="text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Filter by price</h2>
        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            Price: ${priceRange[0]} — ${priceRange[1]}
          </div>
          <Slider
            defaultValue={[10, 5760]}
            max={5760}
            min={10}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={applyFilters}
            className="text-xs font-semibold px-6 h-8 border-gray-300 hover:bg-transparent hover:text-black"
          >
            FILTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
