"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const AllProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 my-6">
      {/* Header Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-40" />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <Card className="mb-6">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Skeleton className="h-4 w-28" />

              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-5 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button disabled variant="outline" className="h-9 w-9">
              <Skeleton className="h-4 w-4" />
            </Button>
            {Array.from({ length: 3 }).map((_, i) => (
              <Button key={i} disabled variant="outline" className="h-9 w-9">
                <Skeleton className="h-4 w-4" />
              </Button>
            ))}
            <Button disabled variant="outline" className="h-9 w-9">
              <Skeleton className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductSkeleton;
