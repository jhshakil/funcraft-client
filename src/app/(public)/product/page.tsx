import { Suspense } from "react";
import AllProductWrapper from "./_components/AllProductWrapper";
import AllProductSkeleton from "@/components/skeletonLoader/AllProductSkeleton";

const Page = ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <Suspense fallback={<AllProductSkeleton />}>
        <AllProductWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Page;
