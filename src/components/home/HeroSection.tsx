import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <div className="h-[70vh] bg-[url(/images/banner/hero-banner.jpg)] bg-no-repeat bg-cover flex justify-end items-center">
      <div className="bg-background p-[40px] pt-[60px] mr-[60px] w-[643px] rounded-lg opacity-80">
        <span className="text-base font-medium">New Arrival</span>
        <h1 className="mt-1 text-[52px] text-primary font-bold leading-tight">
          Discover Our New Collection
        </h1>
        <p className="mt-5 text-base">
          Explore our latest collection of premium furniture, crafted to inspire
          and elevate every space. Find the perfect pieces to match your style
          today!
        </p>

        <Link
          href={`/shop`}
          className={cn(
            buttonVariants(),
            "w-[222px] h-[70px] text-xl mt-[46px] uppercase"
          )}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
