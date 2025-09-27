"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CreateReviewSkeleton = () => {
  return (
    <div>
      {/* Heading */}
      <Skeleton className="h-8 w-40 mb-4" />

      <div className="space-y-4 max-w-lg">
        {/* Rating Section */}
        <div>
          <Skeleton className="h-5 w-20 mb-2" />
          <div className="flex items-center space-x-2 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-28 w-full rounded-md" />
        </div>

        {/* Info Text */}
        <Skeleton className="h-4 w-72" />

        {/* Submit Button */}
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default CreateReviewSkeleton;
