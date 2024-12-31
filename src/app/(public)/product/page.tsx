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
    limit: "9",
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    category: searchParams.category,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    flashSales: searchParams.flashSales,
  });

  return (
    <div>
      <AllProduct
        products={products.data}
        categories={categories.data}
        meta={products.meta}
        currentPage={searchParams.page || "1"}
      />
    </div>
  );
};

export default Page;
