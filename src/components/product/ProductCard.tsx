"use client";

import Image from "next/image";
import { TProductData } from "@/types/product.types";
import Link from "next/link";
import AddToCart from "../shared/AddToCart";

type Props = {
  product: TProductData;
};

export function ProductCard({ product }: Props) {
  const { name, discount = 0, thumbnailImage, price, ratting = 0 } = product;

  const discountAmount = discount ? (price * discount) / 100 : 0;
  const discountedPrice = price - discountAmount;

  return (
    <div className="relative max-w-sm rounded-lg overflow-hidden group shadow-lg">
      <Link href={`/product/${product?.id}`}>
        {discount && discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-md z-10">
            -{discount}%
          </div>
        )}

        <div className="relative aspect-video">
          {thumbnailImage && (
            <Image
              src={thumbnailImage as string}
              alt={name}
              fill
              className="object-cover"
            />
          )}
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/product/${product?.id}`}>
          <h3 className="font-medium text-base text-gray-900">{name}</h3>
        </Link>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">
              ${discountedPrice ? discountedPrice.toFixed(2) : ""}
            </span>
            {(discount as number) > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${price ? price?.toFixed(2) : ""}
              </span>
            )}
          </div>

          <AddToCart
            product={product}
            className="bg-transparent shadow-none text-primary hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
