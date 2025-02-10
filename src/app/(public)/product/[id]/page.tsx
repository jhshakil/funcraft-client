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

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const productId = params.id;
  
  // Fetch user data in parallel
  const [user, product] = await Promise.all([
    getCurrentUser(),
    getProductById({ id: productId }),
  ]);

  // Additional user-based requests
  const userDataPromise = user?.id ? getUser(user.id) : Promise.resolve(null);
  const reviewCheckPromise = user?.id
    ? checkForReview({ userId: user.id, productId })
    : Promise.resolve({ data: "false" });

  // Related products & reviews
  const relatedProductsPromise = getAllProduct({
    category: product?.data?.category?.name,
    limit: "5",
  });

  const reviewsPromise = getReviewByProductId({ id: productId });

  // Resolve all API calls in parallel
  const [userData, reviewCheck, relatedProducts, reviews] = await Promise.all([
    userDataPromise,
    reviewCheckPromise,
    relatedProductsPromise,
    reviewsPromise,
  ]);

  // Check if user is eligible for review
  const isEnableForReview = reviewCheck?.data === "true";

  // Filter out the current product from related products
  const filterProducts = relatedProducts?.data?.filter(
    (p: TProductData) => p.id !== productId
  );

  return (
    <div className="flex flex-col space-y-16">
      <ProductDetails product={product.data} />
      <CreateReview
        isEnableReview={isEnableForReview}
        productId={productId}
        customerId={userData?.data?.id || ""}
      />
      <ShowReview reviews={reviews.data} />
      <RelatedProduct products={filterProducts} />
      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
