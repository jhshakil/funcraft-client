import AdminOrderList from "@/components/order/AdminOrderList";
import { getCurrentUser } from "@/services/AuthService";
import { getOrderByShopId } from "@/services/orderService";
import { getShopByVendorId } from "@/services/ShopService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const user = await getCurrentUser();
  const shop = await getShopByVendorId(user?.id as string);
  const orders = await getOrderByShopId({
    page: searchParams.page || "1",
    shopId: shop?.data?.id,
  });

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Orders</h1>
      </div>
      <div className="mt-11">
        <AdminOrderList
          orders={orders.data}
          meta={orders.meta}
          currentPage={searchParams.page || "1"}
          path="/dashboard/vendor/orders"
        />
      </div>
    </div>
  );
};

export default Page;
