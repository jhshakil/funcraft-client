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
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateSubscribe } from "@/hooks/subscribe.hook";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const NewsLetter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { mutate: handleCreate } = useCreateSubscribe();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      handleCreate(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsSubscribed(true);
      toast.success(`You've successfully subscribed with ${values.email}`);

      form.reset();
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  }

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl my-12">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-lg bg-background">
          <CardContent className="p-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left Content */}
              <div className="p-6 lg:p-10 space-y-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-2">
                  <Mail className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Subscribe to our newsletter
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Stay updated with our latest products, exclusive offers, and
                    style tips.
                  </p>
                </div>

                <div className="pt-2">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Exclusive deals and discounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>New product announcements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Seasonal style guides and tips</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-muted/30 p-6 lg:p-10 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {isSubscribed ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-semibold">
                        Thank you for subscribing!
                      </h4>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-lg">
                            Subscribe today
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Enter your email to receive our newsletter and
                            special offers.
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="Enter your email address"
                                    className="pr-12 h-12 bg-background"
                                    {...field}
                                  />
                                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full h-12"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              Subscribing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Subscribe <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center pt-2">
                          By subscribing, you agree to our{" "}
                          <a
                            href="/privacy-policy"
                            className="underline hover:text-primary"
                          >
                            Privacy Policy
                          </a>
                          . You can unsubscribe at any time.
                        </p>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsLetter;
