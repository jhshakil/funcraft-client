import CategorySection from "@/components/home/CategorySection";
import HeroSection from "@/components/home/HeroSection";
import HomeProductSection from "@/components/home/HomeProductSection";
import NewsLetter from "@/components/shared/NewsLetter";
import SpecialFeature from "@/components/shared/SpecialFeature";

import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";

const Page = async () => {
  const categories = await getAllCategory({});
  const products = await getAllProduct({
    limit: "8",
  });
  const flashSalesProducts = await getAllProduct({
    limit: "8",
    flashSales: "true",
  });
  const recentProducts = await getAllProduct({
    limit: "8",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const topRatedProducts = await getAllProduct({
    limit: "8",
    sortBy: "ratting",
    sortOrder: "desc",
  });

  return (
    <div className="flex flex-col space-y-20">
      <HeroSection />
      <CategorySection categories={categories.data} />
      <HomeProductSection
        products={products.data}
        title={"Featured Products"}
        link="/product"
      />
      <HomeProductSection
        products={flashSalesProducts.data}
        title="Flash Sale"
        link="/product?flashSales=true"
      />
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
