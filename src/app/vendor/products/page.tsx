import VendorProductList from "@/components/product/VendorProductList";
import { getAllProduct } from "@/services/ProductService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const products = await getAllProduct({
    page: searchParams.page || "1",
    shopId: "6ca986d2-5db7-4f81-bc0e-5ecb1ca04b4a",
  });

  console.log(products);
  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">Products</h1>
      </div>
      <div className="mt-11">
        <VendorProductList
          products={products.data}
          meta={products.meta}
          currentPage={searchParams.page || "1"}
          path="/vendor/products"
        />
      </div>
    </div>
  );
};

export default Page;
