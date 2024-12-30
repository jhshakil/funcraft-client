"use client";

import { TProductData } from "@/types/product.types";
import { ProductCard } from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TCategory } from "@/types/category.type";

type Props = {
  products: TProductData[];
  categories: TCategory[];
};

const AllProductOld = ({ products, categories }: Props) => {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  const generateParam = (data: string) => {
    const url = new URL(window.location.href);
    if (data === "plh") {
      url.searchParams.set("sortBy", "price");
      url.searchParams.set("sortOrder", "asc");
      router.push(url.pathname + url.search);
    }
    if (data === "phl") {
      url.searchParams.set("sortBy", "price");
      url.searchParams.set("sortOrder", "desc");
      router.push(url.pathname + url.search);
    }
    if (data === "rlh") {
      url.searchParams.set("sortBy", "ratting");
      url.searchParams.set("sortOrder", "asc");
      router.push(url.pathname + url.search);
    }
    if (data === "rhl") {
      url.searchParams.set("sortBy", "ratting");
      url.searchParams.set("sortOrder", "desc");
      router.push(url.pathname + url.search);
    }
  };
  const generateCatParam = (data: string) => {
    const url = new URL(window.location.href);
    if (data) {
      url.searchParams.set("category", data);
      router.push(url.pathname + url.search);
    }
  };

  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">All Products</h2>
        <div className="flex items-center gap-11">
          <Select
            value={selectedCat}
            onValueChange={(value) => {
              setSelectedCat(value);
              generateCatParam(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedField}
            onValueChange={(value) => {
              setSelectedField(value);
              generateParam(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rlh">{`Ratting Low > Heigh`}</SelectItem>
                <SelectItem value="rhl">{`Ratting Heigh > Low`}</SelectItem>
                <SelectItem value="plh">{`Price Low > Heigh`}</SelectItem>
                <SelectItem value="phl">{`Price Heigh > Low`}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductOld;
