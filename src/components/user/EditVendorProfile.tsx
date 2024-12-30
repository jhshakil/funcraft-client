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
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { TVendorData } from "@/types/user.types";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactNumber: z
    .string()

    .optional(),
  address: z
    .string()

    .optional(),
  profilePhoto: z.string().optional(),
});

const EditorVendorProfile = ({ userData }: { userData?: TVendorData }) => {
  const [open, setOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<string>();
  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleUpdate, isPending, isSuccess } = useUpdateUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userData?.name || "",
      contactNumber: userData?.contactNumber || "",
      address: userData?.address || "",
    },
  });

  const uploadedFile = (data: string) => {
    setUploadFile(data);
    setOpen(false);
  };

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (uploadFile) {
      formData.profilePhoto = uploadFile as string;
    }
    try {
      handleUpdate(formData);
      userLoading(true);
    } catch (err: any) {
      if (err?.data?.message === "already exist") {
        toast.error("User already exist");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/dashboard/vendor/dashboard");
    }
  }, [isPending, isSuccess]);

  return (
    <div className="mt-11 flex justify-center">
      <div className="flex flex-col gap-11">
        <div>
          <Button size={"icon"} onClick={() => setOpen(true)}>
            <Pen size={16} />
          </Button>
          <AvatarComponent
            src={uploadFile || (userData?.profilePhoto as string)}
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
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
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

export default EditorVendorProfile;
