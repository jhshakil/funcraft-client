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
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import { TAdminData } from "@/types/user.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  profilePhoto: z.string().optional(),
});

const EditorAdminProfile = ({ userData }: { userData?: TAdminData }) => {
  const [uploadFile, setUploadFile] = useState<string>();
  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleUpdate, isPending, isSuccess } = useUpdateUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userData?.name || "",
      profilePhoto: userData?.profilePhoto || "",
    },
  });

  const uploadedFile = (data: string) => {
    setUploadFile(data);
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
      router.push("/dashboard/admin");
    }
  }, [isPending, isSuccess]);

  return (
    
    <Card className="w-full lg:w-3/4 mx-auto my-8">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Edit your Profile</CardTitle>
      <CardDescription>
        Fill your data below to update profile
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
          <div>
            <p className="text-sm">Profile Image</p>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mt-5">
                <AvatarComponent
                  src={uploadFile || (userData?.profilePhoto as string)}
                  className="h-[200px] w-[200px]"
                />
                <div className="md:col-span-2">
                  <EditorImageUpload onSubmit={uploadedFile} />
                </div>
              </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
  );
};

export default EditorAdminProfile;
