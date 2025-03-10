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
import { TDeliveryAddress } from "@/types/user.types";
import { useUser } from "@/context/user.provider";
import { useCreateOrder } from "@/hooks/order.hook";
import { Input } from "../ui/input";
import { useGetCouponByCode } from "@/hooks/coupon.hook";
import { UpdateDeliveryAddress } from "../user/UpdateDeliveryAddress";
import { CreateDeliveryAddress } from "../user/CreateDeliveryAddress";
import { useMakePayment } from "@/hooks/payment.hook";

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

  const {
    mutate: handleCreate,
    isPending,
    isSuccess,
    data: orderData,
  } = useCreateOrder();

  const { mutate: checkCode, data: CodeData } = useGetCouponByCode();
  const { mutate: handlePayment, data: paymentData } = useMakePayment();

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
  }, [isPending, isSuccess]);

  useEffect(() => {
    if (CodeData) {
      setDiscount(CodeData?.data?.discount);
    }
  }, [CodeData]);

  // if (!(cartData && cartData.length)) return <p>No Product added</p>;

  const totalCheckoutPrice = cartData?.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      formData.id = address?.id;

      createOrder(formData?.id as string);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  const createOrder = (deliveryAddressId: string) => {
    const loadingToastId = toast("Loading...", {
      description: "Please wait while we process your request.",
      icon: "⏳",
    });
    try {
      const result = {
        customerId,
        deliveryAddressId,
        shopId: cartData[0]?.shopId as string,
        totalPrice: discount
          ? totalCheckoutPrice - (totalCheckoutPrice * Number(discount)) / 100
          : totalCheckoutPrice,
        products: cartData?.map((item) => {
          const data = {
            productId: item.id as string,
            quantity: item.quantity,
          };

          return data;
        }),
      };

      handleCreate(result);
      updateCartData([]);
      toast.success("Success!", {
        description: "Your request has been completed successfully.",
        icon: "✅",
        duration: 4000,
      });
    } catch (err: any) {
      toast.error("Something went wrong!", {
        description: "Please try again later.",
        icon: "❌",
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const applyCoupon = () => {
    checkCode({ code });
  };

  return (
    <div className="max-w-[600px]">
      <div className="mb-5">
        {address?.address ? (
          <UpdateDeliveryAddress address={address} />
        ) : (
          <CreateDeliveryAddress customerId={customerId} />
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="No Address Created"
                    readOnly
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border border-border p-2 text-left">
                    Product Name
                  </th>
                  <th className="border border-border p-2 text-left">
                    Quantity
                  </th>
                  <th className="border border-border p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-border p-2">{item?.name}</td>
                    <td className="border border-border p-2">
                      {item?.quantity}
                    </td>
                    <td className="border border-border p-2">
                      {item?.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td className="border border-border p-2">Total Price</td>
                  <td className="border border-border p-2"></td>
                  <td className="border border-border p-2">
                    {discount
                      ? totalCheckoutPrice -
                        (totalCheckoutPrice * Number(discount)) / 100
                      : totalCheckoutPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input
              placeholder="Coupon Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => applyCoupon()}
              disabled={!code}
            >
              Apply Coupon
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!(cartData && cartData.length)}
            className="w-full"
          >
            Goto Payment
          </Button>
        </form>
      </Form>
    </div>
  );
}
