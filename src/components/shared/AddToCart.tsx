"use client";

// This is a partial implementation to show how the AddToCart component would need to be updated
// to support the iconOnly prop

import { Button } from "../ui/button";
import type { TProductData } from "@/types/product.types";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

type AddToCartProps = {
  product: TProductData;
  className?: string;
  iconOnly?: boolean;
};

const AddToCart = ({
  product,
  className,
  iconOnly = false,
}: AddToCartProps) => {
  // Your existing AddToCart implementation

  // Add support for iconOnly mode
  if (iconOnly) {
    return (
      <Button
        size="sm"
        variant="outline"
        className={cn("", className)}
        onClick={(e) => {
          e.preventDefault();
          // Your existing add to cart logic
        }}
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Add to cart</span>
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn("", className)}
      onClick={(e) => {
        e.preventDefault();
        // Your existing add to cart logic
      }}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to cart
    </Button>
  );
};

export default AddToCart;
