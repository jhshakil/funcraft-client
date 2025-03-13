"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Images, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { ScrollArea } from "../ui/scroll-area";
import { TShop } from "@/types/shop.type";
import { useUpdateShop } from "@/hooks/shop.hook";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  shop: TShop;
};

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string(),
  logo: z.string().optional(),
});

export function EditShop({ open, setOpen, shop }: Props) {
  const { mutate: handleUpdate, isPending, isSuccess } = useUpdateShop();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      logo: "",
    },
  });

  useEffect(() => {
    if (shop) {
      form.reset({
        id: shop.id || "",
        name: shop.name || "",
        description: shop.description || "",
        logo: shop.logo || "",
      });
    }
  }, [shop, form]);

  useEffect(() => {
    if (!isPending && isSuccess) {
      setOpen(false);
    }
  }, [isPending, isSuccess]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const loadingToastId = toast("Loading...");
    try {
      if (acceptedFiles[0]) {
        const imgRef = ref(imageUploadDB, `/profilePhoto/${v4()}`);
        await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
          await getDownloadURL(imgData.ref).then((val) => {
            formData.logo = val;
            handleUpdate(formData);
            toast.success("Success!");
          });
        });
      } else {
        handleUpdate(formData);
        toast.success("Success!");
      }
    } catch (err: any) {
      toast.error("Something went wrong!");
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <FormLabel>Logo</FormLabel>
                  <div className="mt-3">
                    <Avatar className="w-32 h-32 rounded-lg">
                      <AvatarImage
                        src={shop?.logo as string}
                        alt={shop?.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        <Images />
                      </AvatarFallback>
                    </Avatar>
                  </div>
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

                <Button type="submit" className="w-full">
                  Update
                </Button>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
