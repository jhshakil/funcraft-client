import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TProductData } from "@/types/product.types";
import AddToCart from "../shared/AddToCart";

type Props = {
  products: TProductData[];
};

const OfferProduct = ({ products }: Props) => {
  const getDiscount = (discount: number, price: number) => {
    const discountAmount = discount ? (price * discount) / 100 : 0;
    return price - discountAmount;
  };
  return (
    <section className="my-10">
      <div className="flex justify-between items-top">
        <h2 className="text-xl md:text-3xl font-bold mb-6">Flash Sale</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {products?.slice(0, 2)?.map((product) => (
          <Card
            key={product.id}
            className="relative overflow-hidden bg-gray-50"
          >
            <Badge
              variant="secondary"
              className="absolute right-4 top-4 z-10 bg-primary text-white"
            >
              {product.discount}% Off
            </Badge>
            <CardContent className="grid gap-4 p-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src={product.thumbnailImage as string}
                  alt="Tasty sandwiches and sauce"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-700 md:text-3xl">
                  {product.name}
                </h2>
                <p className="text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    $
                    {getDiscount(product.discount || 0, product.price)
                      ? getDiscount(
                          product.discount || 0,
                          product.price
                        ).toFixed(2)
                      : ""}
                  </span>
                  {(product.discount as number) > 0 && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price ? product.price?.toFixed(2) : ""}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <AddToCart product={product} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OfferProduct;
