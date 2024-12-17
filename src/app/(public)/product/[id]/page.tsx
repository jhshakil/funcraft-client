import ProductDetails from "@/components/product/ProductDetails";
import RelatedProduct from "@/components/product/RelatedProduct";
import { CreateReview } from "@/components/review/CreateReview";
import { getAllProduct, getProductById } from "@/services/ProductService";
import { TProductData } from "@/types/product.types";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const product = await getProductById({ id: params.id });
  const products = await getAllProduct({
    category: product?.data?.category?.name,
    limit: "5",
  });

  const filterProducts = products?.data?.filter(
    (product: TProductData) => product.id !== params.id
  );

  return (
    <div>
      <ProductDetails product={product.data} />
      {/* <CreateReview /> */}
      <RelatedProduct products={filterProducts} />
    </div>
  );
};

export default Page;
