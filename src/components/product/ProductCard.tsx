"use client";

import Image from "next/image";
import type { TProductData } from "@/types/product.types";
import Link from "next/link";
import AddToCart from "../shared/AddToCart";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  product: TProductData;
  viewMode?: "grid" | "grid-dense" | "list";
};

export function ProductCard({ product, viewMode = "grid" }: Props) {
  const {
    id,
    name,
    discount = 0,
    thumbnailImage,
    price,
    ratting = 0,
    description,
  } = product;

  const discountAmount = discount ? (price * discount) / 100 : 0;
  const discountedPrice = price - discountAmount;

  // Render stars based on rating
  const renderRating = () => {
    const stars = [];
    const rating = Math.round(ratting);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      );
    }

    return (
      <div className="flex items-center gap-[1px]">
        {stars}
        <span className="text-xs text-muted-foreground ml-1">
          ({ratting?.toFixed(1)})
        </span>
      </div>
    );
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <div className="relative flex flex-col sm:flex-row gap-4 border rounded-lg overflow-hidden group hover:shadow-md transition-all duration-200">
        <Link
          href={`/product/${id}`}
          className="relative w-full sm:w-48 h-48 flex-shrink-0"
        >
          {discount && discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">
              -{discount}% OFF
            </Badge>
          )}
          <div className="h-full w-full">
            {thumbnailImage ? (
              <Image
                src={(thumbnailImage as string) || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>
        </Link>

        <div className="flex flex-col p-4 flex-1">
          <Link
            href={`/product/${id}`}
            className="group-hover:text-primary transition-colors"
          >
            <h3 className="font-semibold text-lg">{name}</h3>
          </Link>

          <div className="mt-2">{renderRating()}</div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {description || "No description available for this product."}
          </p>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                ${discountedPrice?.toFixed(2)}
              </span>
              {discount && discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${price?.toFixed(2)}
                </span>
              )}
            </div>

            <AddToCart
              product={product}
              className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    );
  }

  // Improved Grid dense view
  if (viewMode === "grid-dense") {
    return (
      <div className="relative rounded-lg overflow-hidden border group hover:shadow-md transition-all duration-200 flex flex-col h-full">
        {/* Discount Badge - Made more prominent */}
        {discount && discount > 0 && (
          <div className="absolute top-0 left-0 z-10 bg-primary text-white px-2 py-1 text-xs font-semibold rounded-br-md">
            {discount}% OFF
          </div>
        )}

        {/* Image Container */}
        <Link href={`/product/${id}`} className="block relative">
          <div className="relative aspect-square bg-muted/30">
            {thumbnailImage ? (
              <Image
                src={(thumbnailImage as string) || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">No image</span>
              </div>
            )}

            {/* Quick Add Button - Overlay on image */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <AddToCart
                product={product}
                className="bg-white hover:bg-primary text-primary hover:text-white transition-colors shadow-md"
                iconOnly
              />
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-3 flex flex-col flex-grow">
          <Link
            href={`/product/${id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-medium text-sm line-clamp-2">{name}</h3>
          </Link>

          {/* Price and Rating */}
          <div className="mt-auto pt-2 flex flex-wrap justify-between gap-1.5">
            {/* Rating */}
            <div className="flex items-center">{renderRating()}</div>

            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-primary">
                ${discountedPrice?.toFixed(2)}
              </span>
              {discount && discount > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  ${price?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div className="relative rounded-lg overflow-hidden border group hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <Link href={`/product/${id}`} className="block">
          {discount && discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">
              -{discount}% OFF
            </Badge>
          )}

          <div className="relative aspect-video">
            {thumbnailImage ? (
              <Image
                src={(thumbnailImage as string) || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>
        </Link>

        <div className="px-4 mt-2">
          <Link
            href={`/product/${id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-medium text-base line-clamp-2">{name}</h3>
          </Link>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between">
          <div>{renderRating()}</div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold">
              ${discountedPrice?.toFixed(2)}
            </span>
            {discount && discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ${price?.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <AddToCart
          product={product}
          className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors w-full"
        />
      </div>
    </div>
  );
}
