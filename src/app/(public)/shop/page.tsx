import AllShop from "@/components/shop/AllShop";
import { getAllShop } from "@/services/ShopService";

type Props = {
  searchParams: {
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    category?: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  const shops = await getAllShop({
    page: searchParams.page || "1",
  });

  return (
    <div>
      <AllShop shops={shops.data} />
    </div>
  );
};

export default Page;
