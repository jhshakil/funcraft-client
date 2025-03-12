"use client";

import type { TProductData } from "@/types/product.types";
import { useState, useEffect } from "react";
import type { TCategory } from "@/types/category.type";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Filter,
  Grid3X3,
  Grid2X2,
  LayoutList,
  SlidersHorizontal,
} from "lucide-react";
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
import { calculatePages, cn } from "@/lib/utils";
import type { TMeta } from "@/types/meta.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type Props = {
  products: TProductData[];
  categories: TCategory[];
  meta: TMeta;
  currentPage: string;
};

type GridView = "grid" | "grid-dense" | "list";

const AllProduct = ({ products, categories, meta, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [gridView, setGridView] = useState<GridView>("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extract active filters from URL on component mount
  useEffect(() => {
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const filters = [];

    if (category) filters.push(`Category: ${category}`);
    if (minPrice || maxPrice) {
      const priceRange = `Price: ${minPrice || "0"} - ${maxPrice || "max"}`;
      filters.push(priceRange);
    }

    setActiveFilters(filters);
  }, [searchParams]);

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

  const clearFilter = (filter: string) => {
    const url = new URL(window.location.href);

    if (filter.startsWith("Category:")) {
      url.searchParams.delete("category");
    } else if (filter.startsWith("Price:")) {
      url.searchParams.delete("minPrice");
      url.searchParams.delete("maxPrice");
    }

    router.push(url.pathname + url.search);
  };

  const clearAllFilters = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("minPrice");
    url.searchParams.delete("maxPrice");
    router.push(url.pathname + url.search);
  };

  const getGridClasses = () => {
    switch (gridView) {
      case "grid":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
      case "grid-dense":
        return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4";
      case "list":
        return "flex flex-col gap-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 my-6">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">Products</CardTitle>
              <CardDescription>
                Browse our collection of products
              </CardDescription>
            </div>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <div className="p-6 h-full overflow-auto">
                  <h3 className="text-lg font-semibold mb-4">
                    Product Filters
                  </h3>
                  <ProductSidebar categories={categories} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductSidebar categories={categories} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {meta.total} {meta.total === 1 ? "product" : "products"}
                  </span>

                  {activeFilters.length > 0 && (
                    <>
                      <Separator
                        orientation="vertical"
                        className="h-4 mx-2 hidden sm:block"
                      />
                      <div className="flex flex-wrap gap-2 items-center">
                        {activeFilters.map((filter) => (
                          <Badge
                            key={filter}
                            variant="secondary"
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => clearFilter(filter)}
                          >
                            {filter}
                            <span className="ml-1">×</span>
                          </Badge>
                        ))}
                        {activeFilters.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="h-7 text-xs"
                          >
                            Clear all
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="hidden sm:flex items-center border rounded-md p-1 mr-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-sm",
                        gridView === "grid" && "bg-muted"
                      )}
                      onClick={() => setGridView("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-sm",
                        gridView === "grid-dense" && "bg-muted"
                      )}
                      onClick={() => setGridView("grid-dense")}
                    >
                      <Grid2X2 className="h-4 w-4" />
                      <span className="sr-only">Dense grid view</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-sm",
                        gridView === "list" && "bg-muted"
                      )}
                      onClick={() => setGridView("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>

                  <Select
                    value={selectedField}
                    onValueChange={(value) => {
                      setSelectedField(value);
                      generateParam(value);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rlh">Rating: Low to High</SelectItem>
                      <SelectItem value="rhl">Rating: High to Low</SelectItem>
                      <SelectItem value="plh">Price: Low to High</SelectItem>
                      <SelectItem value="phl">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          {products.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-6 mb-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  No products found
                </h2>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  Try adjusting your filters or search criteria to find what you
                  are looking for.
                </p>
                <Button onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            </Card>
          ) : (
            <div className={getGridClasses()}>
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={gridView}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="mt-8">
              <Card>
                <CardContent className="p-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={createHref(
                            Number(currentPage) < 2
                              ? 1
                              : Number(currentPage) - 1
                          )}
                          aria-disabled={Number(currentPage) <= 1}
                          className={
                            Number(currentPage) <= 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {visibleItems.map((page) => (
                        <PaginationItem key={`product-pagination_${page}`}>
                          <PaginationLink
                            href={createHref(page)}
                            isActive={page === meta.page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href={createHref(
                            Number(currentPage) === totalPage
                              ? totalPage
                              : Number(currentPage) < totalPage
                              ? Number(currentPage) + 1
                              : totalPage
                          )}
                          aria-disabled={Number(currentPage) >= totalPage}
                          className={
                            Number(currentPage) >= totalPage
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// This is a placeholder component for the ShoppingBag icon
// You should import this from lucide-react or another icon library
const ShoppingBag = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
};

export default AllProduct;
