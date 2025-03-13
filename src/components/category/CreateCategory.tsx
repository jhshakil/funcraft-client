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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useCreateCategory } from "@/hooks/category.hook";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

export function CreateCategory() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: handleCreate, isPending, isSuccess } = useCreateCategory();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setDialogOpen(false);
    }
  }, [isPending, isSuccess]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      if (acceptedFiles[0]) {
        const imgRef = ref(imageUploadDB, `/profilePhoto/${v4()}`);
        await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
          await getDownloadURL(imgData.ref).then((val) => {
            formData.image = val;
            handleCreate(formData);
            toast.success("Success!");
          });
        });
      } else {
        handleCreate(formData);
        toast.success("Success!");
      }

      form.reset({
        name: "",
        description: "",
        image: "",
      });
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>Create Category</Button>
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
                          Click to upload files &#40;files should be under 10 MB
                          &#41;
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
                Create Category
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
