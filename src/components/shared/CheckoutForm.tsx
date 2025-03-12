"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import type { TDeliveryAddress } from "@/types/user.types";
import { useUser } from "@/context/user.provider";
import { useCreateOrder } from "@/hooks/order.hook";
import { Input } from "../ui/input";
import { useGetCouponByCode } from "@/hooks/coupon.hook";
import { UpdateDeliveryAddress } from "../user/UpdateDeliveryAddress";
import { CreateDeliveryAddress } from "../user/CreateDeliveryAddress";
import { useMakePayment } from "@/hooks/payment.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, ShoppingBag, Tag } from "lucide-react";

const FormSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 10 characters.",
  }),
  id: z.string().optional(),
});

export function CheckoutForm({
  address,
  customerId,
}: {
  address: TDeliveryAddress;
  customerId: string;
}) {
  const { cartData, updateCartData } = useUser();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const {
    mutate: handleCreate,
    isPending,
    isSuccess,
    data: orderData,
  } = useCreateOrder();

  const {
    mutate: checkCode,
    data: CodeData,
    isPending: isCouponPending,
  } = useGetCouponByCode();
  const {
    mutate: handlePayment,
    data: paymentData,
    isPending: isPaymentPending,
  } = useMakePayment();

  if (paymentData && paymentData?.data?.payment_url) {
    window.location.href = paymentData?.data?.payment_url;
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: address?.address || "",
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      handlePayment({ orderId: orderData?.data?.id });
    }
  }, [isPending, isSuccess, orderData?.data?.id, handlePayment]);

  useEffect(() => {
    if (CodeData) {
      setDiscount(CodeData?.data?.discount);
      setCouponApplied(true);
      toast.success("Coupon applied successfully!", {
        description: `You got ${CodeData?.data?.discount}% discount`,
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
    }
  }, [CodeData]);

  const totalCheckoutPrice =
    cartData?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;

  const discountAmount = discount
    ? (totalCheckoutPrice * Number(discount)) / 100
    : 0;

  const finalPrice = totalCheckoutPrice - discountAmount;

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      formData.id = address?.id;
      createOrder(formData?.id as string);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  const createOrder = (deliveryAddressId: string) => {
    const loadingToastId = toast("Processing your order...", {
      description: "Please wait while we prepare your order.",
      icon: <ShoppingBag className="h-4 w-4 animate-pulse" />,
    });

    try {
      const result = {
        customerId,
        deliveryAddressId,
        shopId: cartData?.[0]?.shopId as string,
        totalPrice: finalPrice,
        products:
          cartData?.map((item) => ({
            productId: item.id as string,
            quantity: item.quantity,
          })) || [],
      };

      handleCreate(result);
      updateCartData([]);
    } catch (err: any) {
      toast.error("Failed to create order", {
        description: "Please try again later.",
        icon: "❌",
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const applyCoupon = () => {
    if (!code.trim()) return;
    checkCode({ code });
  };

  const isCartEmpty = !(cartData && cartData.length > 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Address and Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                {address?.address ? (
                  <UpdateDeliveryAddress address={address} />
                ) : (
                  <CreateDeliveryAddress customerId={customerId} />
                )}
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="No Address Created"
                            readOnly
                            className="min-h-[80px] bg-muted/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5" />
                      <h3 className="text-lg font-medium">Apply Coupon</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-2">
                      <div className="relative w-full">
                        <Input
                          placeholder="Enter coupon code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="pr-20"
                          disabled={couponApplied || isCouponPending}
                        />
                        {couponApplied && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={applyCoupon}
                        disabled={
                          !code.trim() || couponApplied || isCouponPending
                        }
                        className="whitespace-nowrap"
                        variant={couponApplied ? "outline" : "default"}
                      >
                        {isCouponPending
                          ? "Checking..."
                          : couponApplied
                          ? "Applied"
                          : "Apply Coupon"}
                      </Button>
                    </div>

                    {couponApplied && (
                      <p className="text-sm text-green-600 mt-2">
                        {discount}% discount applied to your order!
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isCartEmpty || isPending || isPaymentPending}
                      className="w-full"
                      size="lg"
                    >
                      {isPending || isPaymentPending ? (
                        "Processing..."
                      ) : (
                        <span className="flex items-center gap-2">
                          Proceed to Payment <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {isCartEmpty ? (
                <div className="text-center py-6">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartData?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start pb-3 border-b"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item?.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${item?.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalCheckoutPrice.toFixed(2)}</span>
                    </div>

                    {discount && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
