import { CreateProduct } from "@/components/product/CreateProduct";
import VendorProductList from "@/components/product/VendorProductList";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProductByShopId } from "@/services/ProductService";
import { TCategory } from "@/types/category.type";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const products = await getAllProductByShopId({
    page: searchParams.page || "1",
    shopId: "6ca986d2-5db7-4f81-bc0e-5ecb1ca04b4a",
  });

  const categories = await getAllCategory();

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Products</h1>
        <div>
          <CreateProduct
            categories={categories.data as TCategory[]}
            shopId={products?.data[0]?.shop?.id}
          />
        </div>
      </div>
      <div className="mt-11">
        <VendorProductList
          products={products.data}
          meta={products.meta}
          currentPage={searchParams.page || "1"}
          path="/vendor/products"
          categories={categories.data as TCategory[]}
        />
      </div>
    </div>
  );
};

export default Page;
