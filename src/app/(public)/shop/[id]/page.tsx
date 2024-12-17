import ShopDetails from "@/components/shop/ShopDetails";
import { getCurrentUser } from "@/services/AuthService";
import { getShopById } from "@/services/ShopService";
import { getUser } from "@/services/UserService";
import { TVendorData } from "@/types/user.types";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const shop = await getShopById({ id: params.id });
  const user = await getCurrentUser();

  let userData: { data: TVendorData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  console.log(userData);

  return (
    <div>
      <ShopDetails shop={shop.data} user={userData?.data as TVendorData} />
    </div>
  );
};

export default Page;
