import { Suspense } from "react";
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
import ProductDetailsSkeleton from "@/components/skeletonLoader/ProductDetailsSkeleton";
import CreateReviewSkeleton from "@/components/skeletonLoader/CreateReviewSkeleton";
import ShowReviewSkeleton from "@/components/skeletonLoader/ShowReviewSkeleton";
import RelatedProductSkeleton from "@/components/skeletonLoader/RelatedProductSkeleton";

// Product Details
async function ProductDetailsSection({ productId }: { productId: string }) {
  const product = await getProductById({ id: productId });
  return <ProductDetails product={product.data} />;
}

// Create Review with user check
async function CreateReviewSection({ productId }: { productId: string }) {
  const user = await getCurrentUser();

  if (!user?.id) {
    return (
      <CreateReview
        isEnableReview={false}
        productId={productId}
        customerId=""
      />
    );
  }

  const [userData, reviewCheck] = await Promise.all([
    getUser(user.id),
    checkForReview({ userId: user.id, productId }),
  ]);

  const isEnableForReview = reviewCheck?.data === "true";

  return (
    <CreateReview
      isEnableReview={isEnableForReview}
      productId={productId}
      customerId={userData?.data?.id || ""}
    />
  );
}

// Show Reviews
async function ShowReviewsSection({ productId }: { productId: string }) {
  const reviews = await getReviewByProductId({ id: productId });
  return <ShowReview reviews={reviews.data} />;
}

// Related Products
async function RelatedProductsSection({ productId }: { productId: string }) {
  const product = await getProductById({ id: productId });
  const category = product.data?.category?.name;

  if (!category) {
    return <RelatedProduct products={[]} />;
  }

  const relatedProducts = await getAllProduct({
    category,
    limit: "5",
  });

  const filterProducts = relatedProducts?.data?.filter(
    (p: TProductData) => p.id !== productId
  );

  return <RelatedProduct products={filterProducts} />;
}

// Main Page Component
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const productId = params.id;

  return (
    <div className="flex flex-col space-y-16">
      {/* Product Details */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsSection productId={productId} />
      </Suspense>

      {/* Create Review */}
      <Suspense fallback={<CreateReviewSkeleton />}>
        <CreateReviewSection productId={productId} />
      </Suspense>

      {/* Show Reviews */}
      <Suspense fallback={<ShowReviewSkeleton />}>
        <ShowReviewsSection productId={productId} />
      </Suspense>

      {/* Related Products */}
      <Suspense fallback={<RelatedProductSkeleton />}>
        <RelatedProductsSection productId={productId} />
      </Suspense>

      {/* Static Components */}
      <SpecialFeature />
      <NewsLetter />
    </div>
  );
};

export default Page;
