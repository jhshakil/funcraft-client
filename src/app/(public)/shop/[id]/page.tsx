import ShopDetails from "@/components/shop/ShopDetails";
import { getCurrentUser } from "@/services/AuthService";
import { getShopById } from "@/services/ShopService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const shop = await getShopById({ id: params.id });
  const user = await getCurrentUser();

  return (
    <div>
      <ShopDetails shop={shop.data} role={user?.role as string} />
    </div>
  );
};

export default Page;
