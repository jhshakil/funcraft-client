import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <div className="h-[80vh] 2xl:h-[70vh] bg-[url(/images/banner/hero-banner.jpg)] bg-no-repeat bg-cover flex justify-end items-center">
      <div className="bg-background p-[40px] pt-[60px] md:mr-[60px] w-[643px] rounded-lg opacity-80">
        <span className="text-base font-medium">New Arrival</span>
        <h1 className="mt-1 text-3xl md:text-[52px] text-primary font-bold leading-tight">
          Discover Our Flash Sale Product
        </h1>
        <p className="mt-5 text-base">
          Explore our latest collection of premium furniture, crafted to inspire
          and elevate every space. Find the perfect pieces to match your style
          today!
        </p>

        <Link
          href={`/product?flashSales=true`}
          className={cn(
            buttonVariants(),
            "w-[180px] h-[60px] text-xl mt-[46px] uppercase"
          )}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
