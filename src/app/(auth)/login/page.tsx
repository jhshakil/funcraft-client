/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      handleUserLogin(data);
      userLoading(true);
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <Card className="w-full md:w-[500px] mx-auto my-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Fill your data below to login your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center flex-wrap gap-4">
          <Button
            onClick={() =>
              form.reset({ email: "jhshakil@gmail.com", password: "12345678" })
            }
          >
            Demo Admin
          </Button>
          <Button
            onClick={() =>
              form.reset({ email: "jvendor@gmail.com", password: "12345678" })
            }
          >
            Demo Vendor
          </Button>
          <Button
            onClick={() =>
              form.reset({ email: "jcustomer@gmail.com", password: "12345678" })
            }
          >
            Demo Customer
          </Button>
        </div>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-sm">
            Forget Password{" "}
            <Link
              href={"/forget-password"}
              className={cn(buttonVariants({ variant: "link" }), "px-1.5")}
            >
              click here
            </Link>
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or Register
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm">
          If you do not have an account
          <Link
            href={"/registration"}
            className={cn(buttonVariants({ variant: "link" }), "px-1.5")}
          >
            click here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Page;
