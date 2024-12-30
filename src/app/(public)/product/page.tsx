import AllProduct from "@/components/product/AllProduct";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";
import { TProductQuery } from "@/types/product.types";

type Props = {
  searchParams: TProductQuery;
};

const Page = async ({ searchParams }: Props) => {
  const categories = await getAllCategory({ limit: "20" });
  const products = await getAllProduct({
    page: searchParams.page || "1",
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    category: searchParams.category,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    recent: searchParams.recent,
    bestSelling: searchParams.bestSelling,
    topRated: searchParams.topRated,
    flashSales: searchParams.flashSales,
    clearance: searchParams.clearance,
    discounts: searchParams.discounts,
  });

  return (
    <div>
      <AllProduct products={products.data} categories={categories.data} />
    </div>
  );
};

export default Page;
