"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { TProductData } from "@/types/product.types";
import AddToCart from "@/components/shared/AddToCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Minus, Plus, ShoppingBag, Star, StarHalf } from "lucide-react";
import { useUser } from "@/context/user.provider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  product: TProductData;
};

const ProductDetails = ({ product }: Props) => {
  const { recentProduct, updateRecentProduct } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product?.thumbnailImage as string
  );

  const discountAmount = product?.discount
    ? (product?.price * product?.discount) / 100
    : 0;
  const discountedPrice = product?.price - discountAmount;

  const fullStars = Math.floor((product?.ratting as number) || 0);
  const hasHalfStar = ((product?.ratting as number) || 0) % 1 !== 0;

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const filterRecent = recentProduct
      ?.slice(0, 10)
      ?.filter((el) => el.id !== product.id);

    updateRecentProduct([product, ...filterRecent]);
  }, [product]);

  // For demo purposes, let's assume we have some additional images
  // In a real app, these would come from the product data
  const productImages = [product?.thumbnailImage as string];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-background">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={product?.name}
              fill
              className="object-cover transition-all hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {(product?.discount as number) > 0 && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-medium px-2 py-1 rounded-md">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-auto pb-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={cn(
                  "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
                  selectedImage === img ? "border-primary" : "border-muted"
                )}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs px-2 py-0">
                <Link href={`/product?category=${product?.category?.name}`}>
                  {product?.category?.name}
                </Link>
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Link href={`/shop/${product?.shop?.id}`}>
                  {product?.shop?.name}
                </Link>
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              {product?.name}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < fullStars ? (
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    ) : index === fullStars && hasHalfStar ? (
                      <StarHalf className="w-4 h-4 fill-primary text-primary" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-300" />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product?.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              ${discountedPrice ? discountedPrice.toFixed(2) : ""}
            </span>
            {(product?.discount as number) > 0 && (
              <span className="text-lg text-muted-foreground line-through">
                ${product?.price ? product?.price?.toFixed(2) : ""}
              </span>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground line-clamp-5">
              {product?.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div
              className={
                product?.inventoryCount ? "text-green-600" : "text-red-600"
              }
            >
              {product?.inventoryCount ? (
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>In Stock</span>
                </div>
              ) : (
                <span>Out of Stock</span>
              )}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-muted-foreground">
              {product?.inventoryCount} items available
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center border rounded-md w-36 px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="h-full rounded-none"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(Number.parseInt(e.target.value) || 1)
                }
                className="h-full w-full text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-full rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <AddToCart product={product} quantity={quantity} />
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span>
                Sold by{" "}
                <Link
                  href={`/shop/${product?.shop?.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {product?.shop?.name}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <Separator className="mb-6" />
        <div className="prose max-w-none">
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
