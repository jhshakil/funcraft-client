import { getAllProduct } from "@/services/ProductService";
import OfferProduct from "@/components/home/OfferProduct";

const OfferProductWrapper = async () => {
  const res = await getAllProduct({ limit: "10", flashSales: "true" });
  return <OfferProduct products={res.data} />;
};

export default OfferProductWrapper;
