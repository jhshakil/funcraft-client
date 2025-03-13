"use client";

// This is a partial implementation to show how the AddToCart component would need to be updated
// to support the iconOnly prop

import { Button } from "../ui/button";
import type { TProductData } from "@/types/product.types";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/user.provider";
import { useState } from "react";
import { CartAlert } from "./CartAlert";

type AddToCartProps = {
  product: TProductData;
  quantity?: number;
  className?: string;
  iconOnly?: boolean;
};

const AddToCart = ({
  product,
  quantity,
  className,
  iconOnly = false,
}: AddToCartProps) => {
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

  // Add support for iconOnly mode
  if (iconOnly) {
    return (
      <>
        <Button
          size="sm"
          variant="outline"
          className={cn("", className)}
          onClick={() => updateCart(product)}
          disabled={
            user?.role === "VENDOR" ||
            user?.role === "ADMIN" ||
            user?.role === "SUPER_ADMIN"
          }
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
        <CartAlert
          open={openAlert}
          setOpen={setOpenAlert}
          confirmFn={confirmReplace}
        />
      </>
    );
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className={cn("", className)}
        onClick={() => updateCart(product)}
        disabled={
          user?.role === "VENDOR" ||
          user?.role === "ADMIN" ||
          user?.role === "SUPER_ADMIN"
        }
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to cart
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
