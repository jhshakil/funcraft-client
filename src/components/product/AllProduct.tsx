"use client";

import { TProductData } from "@/types/product.types";

import { useState } from "react";
import { TCategory } from "@/types/category.type";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ProductSidebar from "./ProductSidebar";
import { ProductCard } from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { calculatePages } from "@/lib/utils";
import { TMeta } from "@/types/meta.type";

type Props = {
  products: TProductData[];
  categories: TCategory[];
  meta: TMeta;
  currentPage: string;
};

const AllProduct = ({ products, categories, meta, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const totalPage = calculatePages(meta.total, meta.limit);
  const start = Math.max(0, Number(currentPage) - 2);
  const end = Math.min(totalPage, start + 3);
  const adjustedStart = Math.max(0, end - 3);
  const visibleItems = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  ).slice(adjustedStart, end);

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

  const createHref = (page: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, page: String(page) };
    return `/product?${new URLSearchParams(updatedParams).toString()}`;
  };

  return (
    <div className="px-4 py-8 my-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden mb-4 w-[100px]">
              <Menu className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="px-1">
              <ProductSidebar categories={categories} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block w-[300px] flex-shrink-0">
          <ProductSidebar categories={categories} />
        </div>

        <div className="flex-1">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-sm text-gray-600">
                Showing total {meta.total} results
              </p>
              <div className="flex items-center gap-2">
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
                    <SelectItem value="rlh">{`Ratting Low > Heigh`}</SelectItem>
                    <SelectItem value="rhl">{`Ratting Heigh > Low`}</SelectItem>
                    <SelectItem value="plh">{`Price Low > Heigh`}</SelectItem>
                    <SelectItem value="phl">{`Price Heigh > Low`}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
              }
            >
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination className="justify-end">
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href={createHref(
                        Number(currentPage) < 2 ? 1 : Number(currentPage) - 1
                      )}
                    />
                  </PaginationItem>

                  {/* Page Links */}
                  {visibleItems.map((el) => (
                    <PaginationItem key={`product-pagination_${el}`}>
                      <PaginationLink
                        href={createHref(el)}
                        isActive={el === meta.page}
                      >
                        {el}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href={createHref(
                        Number(currentPage) === totalPage
                          ? totalPage
                          : Number(currentPage) < totalPage
                          ? Number(currentPage) + 1
                          : totalPage
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
