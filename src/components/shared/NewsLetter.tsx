"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const NewsLetter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success(`You've successfully subscribed with ${values.email}`);

    form.reset();
  }

  return (
    <div className="pb-[64px] grid grid-cols-2 gap-20 items-center">
      <div>
        <small className="text-sm text-primary font-medium">
          Join our newsletter
        </small>
        <h3 className="mt-2 text-3xl font-medium">
          Get our emails for info on new items, <br /> sales and more.
        </h3>
        <p className="mt-2 text-muted-foreground">{`We'll email you a voucher worth $10 off your first order over $50.`}</p>
      </div>
      <div className="flex justify-end">
        <div className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe to newsletter"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
