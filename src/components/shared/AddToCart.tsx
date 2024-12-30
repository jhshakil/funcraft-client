"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/user.provider";
import { TProductData } from "@/types/product.types";
import { useState } from "react";
import { CartAlert } from "./CartAlert";

type Props = {
  className?: string;
  product: TProductData;
  quantity?: number;
};

const AddToCart = ({ className, product, quantity }: Props) => {
  const { cartData, updateCartData, user } = useUser();
  const [openAlert, setOpenAlert] = useState(false);

  const updateCart = (product: TProductData) => {
    const findDifferentShop = cartData?.find(
      (el) => el.shopId !== product.shopId
    );
    if (findDifferentShop) {
      setOpenAlert(true);
    } else {
      const findDuplicate = cartData?.find((el) => el.id === product.id);
      if (findDuplicate) {
        const updateOldData = cartData.filter((el) => {
          if (el.id === product.id) {
            if (quantity) {
              el.quantity += quantity;
            } else {
              el.quantity += 1;
            }
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
          quantity: quantity ?? 1,
        };
        updateCartData([...cartData, sampleData]);
      }
    }
  };

  const confirmReplace = () => {
    const sampleData = {
      id: product.id,
      shopId: product.shopId,
      name: product.name,
      thumbnailImage: product.thumbnailImage,
      mainPrice: Number(product.price),
      totalPrice: Number(product.price),
      quantity: 1,
    };
    updateCartData([sampleData]);

    setOpenAlert(false);
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
      <CartAlert
        open={openAlert}
        setOpen={setOpenAlert}
        confirmFn={confirmReplace}
      />
    </>
  );
};

export default AddToCart;
