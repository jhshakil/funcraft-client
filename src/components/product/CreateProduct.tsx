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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { ScrollArea } from "../ui/scroll-area";
import { TCategory } from "@/types/category.type";
import { useCreateProduct } from "@/hooks/product.hook";

type Props = {
  categories: TCategory[];
  shopId: string;
};

const FormSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string(),
    thumbnailImage: z.string().optional(),
    categoryId: z.string(),
    shopId: z.string().optional(),
    price: z.coerce.number(),
    discount: z.coerce.number().optional(),
    inventoryCount: z.coerce.number().min(1, {
      message: "Minimum 1 Inventory",
    }),
    status: z.enum(["PUBLISHED", "DRAFT", "BLOCKED"]),
  })
  .refine(
    (data) => {
      if (data.discount !== undefined) {
        return data.discount <= data.price;
      }
      return true;
    },
    {
      message: "Discount cannot be greater than price.",
      path: ["discount"],
    }
  );

export function CreateProduct({ categories, shopId }: Props) {
  const [proOpen, setProOpen] = useState(false);
  const { mutate: handleCreate, isPending, isSuccess } = useCreateProduct();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "PUBLISHED",
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setProOpen(false);
    }
  }, [isPending, isSuccess]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const loadingToastId = toast("Loading...", {
      description: "Please wait while we process your request.",
      icon: "⏳",
    });
    try {
      formData.shopId = shopId;
      if (acceptedFiles[0]) {
        const imgRef = ref(imageUploadDB, `/profilePhoto/${v4()}`);
        await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
          await getDownloadURL(imgData.ref).then((val) => {
            formData.thumbnailImage = val;
            handleCreate(formData);
            toast.success("Success!", {
              description: "Your request has been completed successfully.",
              icon: "✅",
              duration: 4000,
            });
          });
        });
      } else {
        handleCreate(formData);
        toast.success("Success!", {
          description: "Your request has been completed successfully.",
          icon: "✅",
          duration: 4000,
        });
      }
    } catch (err: any) {
      toast.error("Something went wrong!", {
        description: "Please try again later.",
        icon: "❌",
      });
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  return (
    <Dialog open={proOpen} onOpenChange={setProOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setProOpen(true)}>Create Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] px-0">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <ScrollArea className="h-[70vh] w-full px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-1"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your description"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="mt-5">
                    <p className="text-sm">Upload Image</p>
                    <label
                      {...getRootProps()}
                      className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2"
                    >
                      <div className=" text-center">
                        <div className=" border p-2 rounded-md max-w-min mx-auto">
                          <UploadCloud size={20} />
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">Drag files</span>
                        </p>
                        {acceptedFiles[0]?.name ? (
                          <p className="text-xs text-gray-500">
                            {acceptedFiles[0].name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">
                            Click to upload files &#40;files should be under 10
                            MB &#41;
                          </p>
                        )}
                      </div>
                    </label>

                    <Input
                      {...getInputProps()}
                      id="dropzone-file"
                      accept="image/png, image/jpeg"
                      type="file"
                      className="hidden"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your price"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your discount"
                          value={field.value === null ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inventoryCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your inventory number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id as string}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create
                </Button>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
