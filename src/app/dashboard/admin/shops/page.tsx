import AdminShopList from "@/components/shop/AdminShopList";
import { getAllShopByAdmin } from "@/services/ShopService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const shops = await getAllShopByAdmin({
    page: searchParams.page || "1",
  });
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Shops</h1>
      </div>
      <div className="mt-11">
        <AdminShopList
          shops={shops.data}
          meta={shops.meta}
          currentPage={searchParams.page || "1"}
          path="/dashboard/admin/shops"
        />
      </div>
    </div>
  );
};

export default Page;
