import ProductDetails from "@/components/product/ProductDetails";
import { getProductById } from "@/services/ProductService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const product = await getProductById({ id: params.id });
  return (
    <div>
      <ProductDetails product={product.data} />
    </div>
  );
};

export default Page;
