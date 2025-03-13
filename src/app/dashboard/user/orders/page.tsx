import AdminOrderList from "@/components/order/AdminOrderList";
import UserOrderList from "@/components/order/UserOrderList";
import { getCurrentUser } from "@/services/AuthService";
import { getOrderByCustomer } from "@/services/orderService";
import { getUser } from "@/services/UserService";
import { TCustomerData } from "@/types/user.types";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const user = await getCurrentUser();
  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  const orders = await getOrderByCustomer({
    page: searchParams.page || "1",
    customerId: userData?.data?.id as string,
  });

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Orders</h1>
      </div>
      <div className="mt-11">
        <UserOrderList
          orders={orders.data}
          meta={orders.meta}
          currentPage={searchParams.page || "1"}
          path="/user/orders"
        />
      </div>
    </div>
  );
};

export default Page;
