import AdminOrderList from "@/components/order/AdminOrderList";
import { getAllOrder } from "@/services/orderService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const orders = await getAllOrder({
    page: searchParams.page || "1",
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
          path="/admin/orders"
        />
      </div>
    </div>
  );
};

export default Page;
