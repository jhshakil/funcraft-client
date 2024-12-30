"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { TProductData } from "@/types/product.types";
import Link from "next/link";
import AddToCart from "../shared/AddToCart";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  product: TProductData;
};

export function ProductCard({ product }: Props) {
  const { name, discount = 0, thumbnailImage, price, ratting = 0 } = product;

  const discountAmount = discount ? (price * discount) / 100 : 0;
  const discountedPrice = price - discountAmount;

  return (
    <div className="relative max-w-sm rounded-lg overflow-hidden group shadow-lg">
      {discount && discount > 0 && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-md z-10">
          -{discount}%
        </div>
      )}

      <div className="relative aspect-square">
        <Image
          src={thumbnailImage as string}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg text-gray-900">{name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            ${discountedPrice ? discountedPrice.toFixed(2) : ""}
          </span>
          {(discount as number) > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${price ? price?.toFixed(2) : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < ratting
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {ratting ? ratting.toFixed(1) : ""} Rating
          </span>
        </div>

        <div className="!mt-4 flex justify-between items-center">
          <Link
            href={`/product/${product?.id}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Show Details
          </Link>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
