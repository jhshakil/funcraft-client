import { CheckoutForm } from "@/components/shared/CheckoutForm";
import { CreateDeliveryAddress } from "@/components/user/CreateDeliveryAddress";
import { UpdateDeliveryAddress } from "@/components/user/UpdateDeliveryAddress";
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Checkout</h1>
        <div>
          {address.success ? (
            <UpdateDeliveryAddress address={address?.data} />
          ) : (
            <CreateDeliveryAddress customerId={userData?.data?.id as string} />
          )}
        </div>
      </div>
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
