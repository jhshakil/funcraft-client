"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCoupon } from "@/hooks/coupon.hook";

const FormSchema = z.object({
  discount: z.string().min(1, {
    message: "Discount is required",
  }),
});

export function CreateCoupon() {
  const { mutate: handleCreate } = useCreateCoupon();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discount: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleCreate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="flex items-end gap-11">
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input placeholder="discount %" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Coupon</Button>
        </div>
      </form>
    </Form>
  );
}
