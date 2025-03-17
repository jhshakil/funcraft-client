"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import { cn } from "@/lib/utils";
import type { TCartData } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const { cartData, updateCartData } = useUser();

  const updateQuantity = (product: TCartData, increase: boolean) => {
    const findDuplicate = cartData?.find((el) => el.id === product.id);
    if (findDuplicate) {
      const updateOldData = cartData.filter((el) => {
        if (el.id === product.id) {
          if (increase) {
            el.quantity += 1;
          } else {
            el.quantity -= 1;
          }
          el.totalPrice = Number(
            (Number(el.mainPrice) * el.quantity).toFixed(2)
          );
          return el;
        } else {
          return el;
        }
      });
      updateCartData(updateOldData);
    }
  };

  const removeCart = (productId: string) => {
    const updateData = cartData?.filter((el) => el.id !== productId);
    updateCartData(updateData);
  };

  const totalCheckoutPrice =
    cartData?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;

  const totalItems =
    cartData?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const isCartEmpty = !(cartData && cartData.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold">Your Shopping Cart</h1>
          {!isCartEmpty && (
            <Badge variant="outline" className="ml-2">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Badge>
          )}
        </div>

        {!isCartEmpty && (
          <Link
            href="/dashboard/user/checkout"
            className={cn(buttonVariants({ size: "lg" }), "whitespace-nowrap")}
          >
            Proceed to Checkout
          </Link>
        )}
      </div>

      {isCartEmpty ? (
        <EmptyCartState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartData?.map((cart) => (
                    <div
                      key={cart.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden bg-muted/50">
                        <Image
                          src={
                            (cart?.thumbnailImage as string) ||
                            "/placeholder.svg"
                          }
                          alt={cart?.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate">
                          {cart?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Unit Price: ${Number(cart?.mainPrice).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 mt-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(cart, false)}
                            disabled={cart?.quantity <= 1}
                          >
                            <MinusCircle className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-10 text-center font-medium">
                            {cart?.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(cart, true)}
                          >
                            <PlusCircle className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                        <span className="font-semibold text-lg">
                          ${cart?.totalPrice.toFixed(2)}
                        </span>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => removeCart(cart?.id as string)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartData?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1 truncate pr-4">
                        <span className="font-medium">{item?.name}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          × {item?.quantity}
                        </span>
                      </div>
                      <span>${item?.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalCheckoutPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalCheckoutPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/dashboard/user/checkout"
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/product"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full"
                    )}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyCartState = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardContent className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-6 mb-6">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {`Looks like you haven't added anything to your cart yet. Browse our
        products and find something you'll love!`}
      </p>
      <Link href="/product" className={cn(buttonVariants({ size: "lg" }))}>
        Start Shopping
      </Link>
    </CardContent>
  </Card>
);

export default Page;
