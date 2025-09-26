import NewArrivals from "@/components/home/NewArrivals";
import { getAllProduct } from "@/services/ProductService";

const NewArrivalsWrapper = async () => {
  const res = await getAllProduct({
    limit: "10",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return <NewArrivals products={res.data} />;
};

export default NewArrivalsWrapper;
