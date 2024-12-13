import CategorySection from "@/components/home/CategorySection";
import HeroSection from "@/components/home/HeroSection";
import HomeProductSection from "@/components/home/HomeProductSection";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";

type Props = {
  searchParams: { sortBy?: string; sortOrder?: string; page?: string };
};

const Page = async ({ searchParams }: Props) => {
  const categories = await getAllCategory({ limit: "4" });
  const products = await getAllProduct({
    page: searchParams.page || "1",
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories.data} />
      <HomeProductSection products={products.data} />
    </>
  );
};

export default Page;
