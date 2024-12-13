import { TCategory } from "@/types/category.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

type Props = {
  category: TCategory;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link href={`/shop?category=${category.id}`}>
      <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-2">
            {category.description}
          </CardDescription>
          <p className="text-sm text-muted-foreground">2 items</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
