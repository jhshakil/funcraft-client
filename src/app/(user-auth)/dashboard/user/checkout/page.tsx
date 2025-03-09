import { CheckoutForm } from "@/components/shared/CheckoutForm";
import { getCurrentUser } from "@/services/AuthService";
import { getDeliveryAddressById } from "@/services/DeliveryAddress";
import { getUser } from "@/services/UserService";
import { TCustomerData } from "@/types/user.types";

const Page = async () => {
  const user = await getCurrentUser();
  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  const address = await getDeliveryAddressById({
    id: userData?.data?.id as string,
  });

  return (
    <div className="mt-5">
      <h1 className="text-3xl">Checkout</h1>
      <div className="mt-11">
        <CheckoutForm
          address={address?.data}
          customerId={userData?.data?.id as string}
        />
      </div>
    </div>
  );
};

export default Page;
