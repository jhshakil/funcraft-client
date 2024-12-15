"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@/context/user.provider";

const CartButton = () => {
  const { cartData } = useUser();
  return (
    <div className="relative">
      <div className="absolute -top-2 right-0 bg-primary w-5 h-5 rounded-full flex justify-center items-center">
        <p className="text-white text-xs">{cartData.length}</p>
      </div>
      <Link
        href={"/cart"}
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <ShoppingCart size={16} />
      </Link>
    </div>
  );
};

export default CartButton;
