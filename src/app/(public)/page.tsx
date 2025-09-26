import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";

import SpecialFeature from "@/components/shared/SpecialFeature";
import NewsLetter from "@/components/shared/NewsLetter";

// Skeletons
import CategorySectionWrapper from "./_components/CategorySectionWrapper";
import NewArrivalsWrapper from "./_components/NewArrivalsWrapper";
import HomeProductSectionWrapper from "./_components/HomeProductSectionWrapper";
import OfferProductWrapper from "./_components/OfferProductWrapper";
import CategorySkeleton from "@/components/skeletonLoader/CategorySkeleton";
import NewArrivalsSkeleton from "@/components/skeletonLoader/NewArrivalsSkeleton";
import HomeProductSectionSkeleton from "@/components/skeletonLoader/HomeProductSectionSkeleton";

const Page = () => {
  return (
    <div className="flex flex-col space-y-20 mb-12">
      <HeroSection />

      <Suspense fallback={<CategorySkeleton />}>
        <CategorySectionWrapper />
      </Suspense>

      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivalsWrapper />
      </Suspense>

      <Suspense fallback={<HomeProductSectionSkeleton />}>
        <HomeProductSectionWrapper
          title="Featured Products"
          link="/product"
          type="featured"
        />
      </Suspense>

      <Suspense fallback={<HomeProductSectionSkeleton />}>
        <OfferProductWrapper />
      </Suspense>

      <Suspense fallback={<HomeProductSectionSkeleton />}>
        <HomeProductSectionWrapper
          title="Recent Products"
          link="/product?recent=true"
          type="recent"
        />
      </Suspense>

      <Suspense fallback={<HomeProductSectionSkeleton />}>
        <HomeProductSectionWrapper
          title="Top Rated Products"
          link="/product?topRated=true"
          type="topRated"
        />
      </Suspense>

      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
