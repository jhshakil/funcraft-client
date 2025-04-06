import CategorySection from "@/components/home/CategorySection";
import HeroSection from "@/components/home/HeroSection";
import HomeProductSection from "@/components/home/HomeProductSection";
import NewArrivals from "@/components/home/NewArrivals";
import OfferProduct from "@/components/home/OfferProduct";
import NewsLetter from "@/components/shared/NewsLetter";
import SpecialFeature from "@/components/shared/SpecialFeature";

import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";

const Page = async () => {
  const [
    categories,
    products,
    flashSalesProducts,
    recentProducts,
    topRatedProducts,
  ] = await Promise.all([
    getAllCategory({}),
    getAllProduct({ limit: "10" }),
    getAllProduct({ limit: "10", flashSales: "true" }),
    getAllProduct({ limit: "10", sortBy: "createdAt", sortOrder: "desc" }),
    getAllProduct({ limit: "10", sortBy: "rating", sortOrder: "desc" }),
  ]);

  return (
    <div className="flex flex-col space-y-20 mb-12">
      <HeroSection />
      <CategorySection categories={categories.data} />
      <NewArrivals products={recentProducts.data} />
      <HomeProductSection
        products={products.data}
        title={"Featured Products"}
        link="/product"
      />
      <OfferProduct products={flashSalesProducts.data} />
      <HomeProductSection
        products={recentProducts.data}
        title="Recent Product"
        link="/product?recent=true"
      />
      <HomeProductSection
        products={topRatedProducts.data}
        title="Top Rated Product"
        link="/product?topRated=true"
      />
      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
