import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { TShop } from "@/types/shop.type";
import Image from "next/image";
import { Building2 } from "lucide-react";

type Props = {
  shop: TShop;
};

const ShopCard = ({ shop }: Props) => {
  return (
    <Link href={`/shop/${shop.id}`}>
      <Card
        key={shop.id}
        className="overflow-hidden hover:shadow-lg transition-shadow"
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {shop.logo ? (
                <Image
                  src={shop.logo}
                  alt={`${shop.name} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {shop.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {shop.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopCard;
