"use client";

import { TProductData } from "@/types/product.types";
import { ProductCard } from "../product/ProductCard";
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

type Props = {
  products: TProductData[];
};

const HomeProductSection = ({ products }: Props) => {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("");

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
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">All Products Products</h2>
        <Select
          value={selectedField}
          onValueChange={(value) => {
            setSelectedField(value);
            generateParam(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Product" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductSection;
