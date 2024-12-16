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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useUpdateAddress } from "@/hooks/deliveryAddress.hook";
import { TDeliveryAddress } from "@/types/user.types";
import { useUser } from "@/context/user.provider";
import { useCreateOrder } from "@/hooks/order.hook";
import { useRouter } from "next/navigation";

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
  const {
    mutate: handleCreate,
    isPending,
    isSuccess,
    data: orderData,
  } = useCreateOrder();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: address?.address || "",
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(`/user/payment?orderId=${orderData?.data?.id}`);
    }
  }, [isPending, isSuccess]);

  if (!(cartData && cartData.length)) return;

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
        totalPrice: totalCheckoutPrice,
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

  return (
    <div className="w-[600px]">
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
                    placeholder="Enter your address"
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
                    {totalCheckoutPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <Button type="submit" className="w-full">
            Goto Payment
          </Button>
        </form>
      </Form>
    </div>
  );
}
