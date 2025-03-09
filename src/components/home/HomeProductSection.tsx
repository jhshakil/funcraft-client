import { TProductData } from "@/types/product.types";
import { ProductCard } from "../product/ProductCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = {
  products: TProductData[];
  title: string;
  link: string;
};

const HomeProductSection = ({ products, title, link }: Props) => {
  if (!products?.length) return;
  return (
    <div className="my-10">
      <div className="flex justify-between items-top">
        <h2 className="text-xl md:text-3xl font-bold mb-6">{title}</h2>
        <Link
          href={link}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductSection;
