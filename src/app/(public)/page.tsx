import CategorySection from "@/components/home/CategorySection";
import HeroSection from "@/components/home/HeroSection";
import HomeProductSection from "@/components/home/HomeProductSection";
import NewsLetter from "@/components/shared/NewsLetter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllCategory } from "@/services/CategoryService";
import { getAllProduct } from "@/services/ProductService";
import { Images } from "lucide-react";

const Page = async () => {
  const categories = await getAllCategory({});
  const products = await getAllProduct({
    limit: "8",
  });
  const flashSalesProducts = await getAllProduct({
    limit: "8",
    flashSales: "true",
  });
  const recentProducts = await getAllProduct({
    limit: "8",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const topRatedProducts = await getAllProduct({
    limit: "8",
    sortBy: "ratting",
    sortOrder: "desc",
  });

  return (
    <div className="flex flex-col space-y-20">
      <HeroSection />
      <CategorySection categories={categories.data} />
      <HomeProductSection
        products={products.data}
        title={"Featured Products"}
        link="/product"
      />
      <HomeProductSection
        products={flashSalesProducts.data}
        title="Flash Sale"
        link="/product?flashSales=true"
      />
      <HomeProductSection
        products={recentProducts.data}
        title="Recent Product"
        link="/product?recent=true"
      />
      <HomeProductSection
        products={topRatedProducts.data}
        title="Top Rated Product"
        link="/product?topRated=true"
      />
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
