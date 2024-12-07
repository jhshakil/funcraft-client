/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useForgetPassword } from "@/hooks/auth.hook";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/user.provider";

const FormSchema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const { mutate: forgettingPassword } = useForgetPassword();
  const { setIsLoading: userLoading } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      forgettingPassword(data);
      logout();
      userLoading(true);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full md:w-[500px] mx-auto my-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Forget Password</CardTitle>
        <CardDescription>
          Fill your data below to forget password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
