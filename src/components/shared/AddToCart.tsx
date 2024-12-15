"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/user.provider";
import { TProductData } from "@/types/product.types";

type Props = {
  className?: string;
  product: TProductData;
};

const AddToCart = ({ className, product }: Props) => {
  const { cartData, updateCartData, user } = useUser();

  const updateCart = (product: TProductData) => {
    const findDifferentShop = cartData?.find((el) => el.shopId === product.id);
    if (findDifferentShop) {
      alert("different");
    } else {
      const findDuplicate = cartData?.find((el) => el.id === product.id);
      if (findDuplicate) {
        const updateOldData = cartData.filter((el) => {
          if (el.id === product.id) {
            el.quantity += 1;
            el.totalPrice = Number(
              (Number(product.price) * el.quantity).toFixed(2)
            );
            return el;
          } else {
            return el;
          }
        });
        updateCartData(updateOldData);
      } else {
        const sampleData = {
          id: product.id,
          shopId: product.shopId,
          name: product.name,
          thumbnailImage: product.thumbnailImage,
          mainPrice: Number(product.price),
          totalPrice: Number(product.price),
          quantity: 1,
        };
        updateCartData([...cartData, sampleData]);
      }
    }
  };
  return (
    <>
      <Button
        className={cn(className)}
        onClick={() => updateCart(product)}
        disabled={
          user?.role === "VENDOR" ||
          user?.role === "ADMIN" ||
          user?.role === "SUPER_ADMIN"
        }
      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </>
  );
};

export default AddToCart;
