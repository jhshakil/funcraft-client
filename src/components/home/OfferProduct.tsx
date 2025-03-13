import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { TProductData } from "@/types/product.types";
import AddToCart from "../shared/AddToCart";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

type Props = {
  products: TProductData[];
};

const OfferProduct = ({ products }: Props) => {
  if (!products?.length) return null;

  const getDiscount = (discount: number, price: number) => {
    const discountAmount = discount ? (price * discount) / 100 : 0;
    return price - discountAmount;
  };

  return (
    <section className="my-8 py-6 px-4 sm:px-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {products?.slice(0, 2)?.map((product) => (
            <Card
              key={product.id}
              className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {(product.discount as number) > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute left-4 top-4 z-10 font-semibold text-sm px-2.5 py-1"
                >
                  {product.discount}% OFF
                </Badge>
              )}

              <CardContent className="p-0 h-full">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                    <Image
                      src={
                        (product.thumbnailImage as string) || "/placeholder.svg"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  <div className="p-5 md:p-6 flex flex-col w-full md:w-1/2">
                    <div className="space-y-3 mb-auto">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {product.description ||
                          "No description available for this product."}
                      </p>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary">
                          $
                          {getDiscount(
                            product.discount || 0,
                            product.price
                          ).toFixed(2)}
                        </span>
                        {(product.discount as number) > 0 && (
                          <span className="text-base text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <AddToCart
                          product={product}
                          className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                        />
                        <Link href={`/product/${product.id}`}>
                          <Button variant="outline" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/product?flashSales=true"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            View all flash sale products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferProduct;
