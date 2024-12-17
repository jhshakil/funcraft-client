import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { TShop } from "@/types/shop.type";

type Props = {
  shop: TShop;
};

const ShopCard = ({ shop }: Props) => {
  return (
    <Link href={`/shop/${shop.id}`}>
      <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{shop.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-2">{shop.description}</CardDescription>
          <p className="text-sm text-muted-foreground">2 items</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopCard;
