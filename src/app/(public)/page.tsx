import CategorySection from "@/components/home/CategorySection";
import HeroSection from "@/components/home/HeroSection";
import HomeProductSection from "@/components/home/HomeProductSection";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";

type Props = {
  searchParams: { sortBy?: string; sortOrder?: string; page?: string };
};

const Page = async ({ searchParams }: Props) => {
  const categories = await getAllCategory({});
  const products = await getAllProduct({
    page: searchParams.page || "1",
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  return (
    <div className="flex flex-col space-y-16">
      <HeroSection />
      <CategorySection categories={categories.data} />
      <HomeProductSection products={products.data} />
    </div>
  );
};

export default Page;
