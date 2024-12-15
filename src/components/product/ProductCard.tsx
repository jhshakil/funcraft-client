"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TProductData } from "@/types/product.types";
import Link from "next/link";
import AddToCart from "../shared/AddToCart";

type Props = {
  product: TProductData;
};

export function ProductCard({ product }: Props) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product?.thumbnailImage as string}
            alt={product?.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">
          <Link href={`/product/${product?.id}`}>{product?.name}</Link>
        </CardTitle>
        <p className="text-sm text-gray-600 mb-2">{product?.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">
            ${product?.price.toFixed(2)}
          </span>
          <Badge variant="secondary">{product?.inventoryCount} in stock</Badge>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round((product?.ratting as number) || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.ratting ? product?.ratting.toFixed(1) : 0})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCart className="w-full" product={product} />
      </CardFooter>
    </Card>
  );
}
