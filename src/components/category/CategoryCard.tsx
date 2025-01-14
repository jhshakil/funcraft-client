import { TCategory } from "@/types/category.type";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Images } from "lucide-react";

type Props = {
  category: TCategory;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link href={`/product?category=${category.name}`}>
      <div className="flex flex-col items-center gap-3 border border-border rounded-lg py-4">
        <Avatar className="h-[66px] w-[66px] rounded-none">
          <AvatarImage src={category.image} alt="Category" />
          <AvatarFallback className="rounded-none">
            <Images />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="text-sm capitalize">{category.name}</h3>
          <p className="text-sm text-muted-foreground">
            {category._count?.product} items
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
