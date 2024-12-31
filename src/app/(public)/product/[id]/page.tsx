import ProductDetails from "@/components/product/ProductDetails";
import RelatedProduct from "@/components/product/RelatedProduct";
import { CreateReview } from "@/components/review/CreateReview";
import ShowReview from "@/components/review/ShowReview";
import NewsLetter from "@/components/shared/NewsLetter";
import SpecialFeature from "@/components/shared/SpecialFeature";
import { getCurrentUser } from "@/services/AuthService";
import { getAllProduct, getProductById } from "@/services/ProductService";
import { checkForReview, getReviewByProductId } from "@/services/ReviewService";
import { getUser } from "@/services/UserService";
import { TProductData } from "@/types/product.types";
import { TCustomerData } from "@/types/user.types";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await getCurrentUser();

  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  let isEnableForReview = false;

  if (userData?.data?.id) {
    const data = await checkForReview({
      userId: userData?.data?.id,
      productId: params.id,
    });

    isEnableForReview = data?.data === "true" ? true : false;
  }

  const product = await getProductById({ id: params.id });
  const products = await getAllProduct({
    category: product?.data?.category?.name,
    limit: "5",
  });
  const reviews = await getReviewByProductId({ id: params.id });

  const filterProducts = products?.data?.filter(
    (product: TProductData) => product.id !== params.id
  );

  return (
    <div className="flex flex-col space-y-16">
      <ProductDetails product={product.data} />
      <CreateReview
        isEnableReview={isEnableForReview}
        productId={params.id}
        customerId={userData?.data?.id as string}
      />
      <ShowReview reviews={reviews.data} />
      <RelatedProduct products={filterProducts} />
      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
