import { CreateProduct } from "@/components/product/CreateProduct";
import VendorProductList from "@/components/product/VendorProductList";
import { getCurrentUser } from "@/services/AuthService";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProductByShopId } from "@/services/ProductService";
import { getShopByVendorId } from "@/services/ShopService";
import { TCategory } from "@/types/category.type";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const user = await getCurrentUser();
  const shop = await getShopByVendorId(user?.id as string);
  const products = await getAllProductByShopId({
    page: searchParams.page || "1",
    shopId: shop?.id,
  });

  const categories = await getAllCategory({});

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
