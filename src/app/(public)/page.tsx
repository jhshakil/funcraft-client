import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import { getAllCategory } from "@/services/CategoryService";

// Dynamic imports for lazy-loading (non-blocking)
import dynamic from "next/dynamic";

const NewArrivals = dynamic(() => import("@/components/home/NewArrivals"), {
  ssr: false,
});
const HomeProductSection = dynamic(
  () => import("@/components/home/HomeProductSection"),
  { ssr: false }
);
const OfferProduct = dynamic(() => import("@/components/home/OfferProduct"), {
  ssr: false,
});
const NewsLetter = dynamic(() => import("@/components/shared/NewsLetter"), {
  ssr: false,
});
const SpecialFeature = dynamic(
  () => import("@/components/shared/SpecialFeature"),
  { ssr: false }
);

import { getAllProduct } from "@/services/ProductService";

export const revalidate = 60; // ISR: Regenerate every 60 seconds

const fetchHomeData = async () => {
  const [categoriesRes, featuredRes, flashSalesRes, recentRes, topRatedRes] =
    await Promise.all([
      getAllCategory({}),
      getAllProduct({ limit: "10" }),
      getAllProduct({ limit: "10", flashSales: "true" }),
      getAllProduct({ limit: "10", sortBy: "createdAt", sortOrder: "desc" }),
      getAllProduct({ limit: "10", sortBy: "rating", sortOrder: "desc" }),
    ]);

  return {
    categories: categoriesRes.data,
    featuredProducts: featuredRes.data,
    flashSalesProducts: flashSalesRes.data,
    recentProducts: recentRes.data,
    topRatedProducts: topRatedRes.data,
  };
};

const Page = async () => {
  const {
    categories,
    featuredProducts,
    flashSalesProducts,
    recentProducts,
    topRatedProducts,
  } = await fetchHomeData();

  return (
    <div className="flex flex-col space-y-20 mb-12">
      {/* Critical Sections (SSR) */}
      <HeroSection />
      <CategorySection categories={categories} />

      {/* Lazy-loaded Sections (Client-side hydration) */}
      <NewArrivals products={recentProducts} />
      <HomeProductSection
        products={featuredProducts}
        title="Featured Products"
        link="/product"
      />
      <OfferProduct products={flashSalesProducts} />
      <HomeProductSection
        products={recentProducts}
        title="Recent Product"
        link="/product?recent=true"
      />
      <HomeProductSection
        products={topRatedProducts}
        title="Top Rated Product"
        link="/product?topRated=true"
      />
      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
