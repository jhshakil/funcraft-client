import AdminProductList from "@/components/product/AdminProductList";
import { getAllProduct } from "@/services/ProductService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const products = await getAllProduct({
    page: searchParams.page || "1",
  });

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Products</h1>
      </div>
      <div className="mt-11">
        <AdminProductList
          products={products.data}
          meta={products.meta}
          currentPage={searchParams.page || "1"}
          path="/admin/products"
        />
      </div>
    </div>
  );
};

export default Page;
