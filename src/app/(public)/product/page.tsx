import AllProduct from "@/components/product/AllProduct";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";

type Props = {
  searchParams: {
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  };
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
  });

  return (
    <div>
      <AllProduct products={products.data} categories={categories.data} />
    </div>
  );
};

export default Page;
