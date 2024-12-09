"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AvatarComponent from "@/components/shared/AvatarComponent";
import EditorImageUpload from "@/components/shared/EditorImageUpload";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const Page = () => {
  const [open, setOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<FileWithPath>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const uploadedFile = (data: FileWithPath) => {
    setUploadFile(data);
  };

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const outerFormData = new FormData();
    outerFormData.append("data", JSON.stringify(formData));
    // try {
    //   handleRegistration(outerFormData);
    //   userLoading(true);
    // } catch (err: any) {
    //   if (err?.data?.message === "already exist") {
    //     toast.error("User already exist");
    //   } else {
    //     toast.error("Something went wrong");
    //   }
    // }
  }
  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">Profile</h1>
      </div>
      <div className="mt-11 flex flex-col gap-11">
        <div>
          <Button size={"icon"} onClick={() => setOpen(true)}>
            <Pen size={16} />
          </Button>
          <AvatarComponent
            src="/images/profile.png"
            className="h-[200px] w-[200px]"
          />
        </div>
        <div className="w-[400px]">
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

              <Button type="submit" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <EditorImageUpload
        open={open}
        setOpen={setOpen}
        onSubmit={uploadedFile}
      />
    </div>
  );
};

export default Page;
