import ProductDetails from "@/components/product/ProductDetails";
import RelatedProduct from "@/components/product/RelatedProduct";
import { CreateReview } from "@/components/review/CreateReview";
import NewsLetter from "@/components/shared/NewsLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllProduct, getProductById } from "@/services/ProductService";
import { TProductData } from "@/types/product.types";
import { Images } from "lucide-react";

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
    <div className="flex flex-col space-y-16">
      <ProductDetails product={product.data} />
      {/* <CreateReview /> */}
      <RelatedProduct products={filterProducts} />
      <div className="py-[40px] px-[60px] flex justify-between items-center gap-20 border-t border-b border-border">
        <div className="flex  items-center gap-3">
          <Avatar className="h-[66px] w-[66px] rounded-none">
            <AvatarImage src={"/images/shipping.png"} alt="Category" />
            <AvatarFallback className="rounded-none">
              <Images />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg capitalize">Free Shipping Orders $260+</h3>
            <p className="text-sm text-muted-foreground">
              A delivery service you can depend on
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-3">
          <Avatar className="h-[66px] w-[66px] rounded-none">
            <AvatarImage src={"/images/customer support.png"} alt="Category" />
            <AvatarFallback className="rounded-none">
              <Images />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg capitalize">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              Satisfied customers are our best ads
            </p>
          </div>
        </div>
        <div className="flex  items-center gap-3">
          <Avatar className="h-[66px] w-[66px] rounded-none">
            <AvatarImage src={"/images/secure payment.png"} alt="Category" />
            <AvatarFallback className="rounded-none">
              <Images />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg capitalize">100% Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              The highest level of security
            </p>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Page;
