"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { TProductData } from "@/types/product.types";
import AddToCart from "../shared/AddToCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Star, StarHalf } from "lucide-react";
import { useUser } from "@/context/user.provider";

type Props = {
  product: TProductData;
};

const ProductDetails = ({ product }: Props) => {
  const { recentProduct, updateRecentProduct } = useUser();
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="mt-11 px-4 py-8">
      <div className="grid md:grid-cols-2 gap-32">
        <div className="relative aspect-square">
          <Image
            src={product?.thumbnailImage as string}
            alt={product?.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < fullStars ? (
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  ) : index === fullStars && hasHalfStar ? (
                    <StarHalf className="w-5 h-5 fill-primary text-primary" />
                  ) : (
                    <Star className="w-5 h-5 text-gray-300" />
                  )}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product?.reviewCount} customer review
            </span>

            {product?.inventoryCount ? (
              <span className="text-sm text-green-600">In Stock</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          <p className="text-gray-600 line-clamp-5">{product?.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">
              ${discountedPrice ? discountedPrice.toFixed(2) : ""}
            </span>
            {(product?.discount as number) > 0 && (
              <span className="text-xl text-gray-400 line-through">
                ${product?.price ? product?.price?.toFixed(2) : ""}
              </span>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="h-10 px-3"
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className="w-16 h-10 text-center border-0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-10 px-3"
              >
                +
              </Button>
            </div>
            <AddToCart product={product} quantity={quantity} />
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <p>Categories :</p>
                <Badge>
                  <Link href={`/product?category=${product?.category?.name}`}>
                    {product?.category?.name}
                  </Link>
                </Badge>
              </div>
              <p>
                Quantity :{" "}
                <span className="ml-1 text-primary">
                  {product?.inventoryCount}
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <p>Shop :</p>
                <Badge>
                  <Link href={`/shop/${product?.shop?.id}`}>
                    {product?.shop?.name}
                  </Link>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-11">
        <h2 className="text-3xl font-medium">Description</h2>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
