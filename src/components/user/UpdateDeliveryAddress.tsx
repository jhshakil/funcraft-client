"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useUpdateAddress } from "@/hooks/deliveryAddress.hook";
import { TDeliveryAddress } from "@/types/user.types";

const FormSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 10 characters.",
  }),
  id: z.string().optional(),
});

export function UpdateDeliveryAddress({
  address,
}: {
  address: TDeliveryAddress;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: handleCreate, isPending, isSuccess } = useUpdateAddress();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: address?.address || "",
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setDialogOpen(false);
      window.location.reload();
    }
  }, [isPending, isSuccess]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      formData.id = address?.id;
      handleCreate(formData);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>Update Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Update Address
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
