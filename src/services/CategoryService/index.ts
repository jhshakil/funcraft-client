"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TCategory } from "@/types/category.type";
import { TMeta } from "@/types/meta.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

export const getAllCategory = async ({
  page,
}: {
  page?: string;
}): Promise<{
  data: TCategory[];
  meta: TMeta;
}> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["categories"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/category`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  if (!res.ok) {
    toast("Failed to get data");
  }

  return res.json();
};

export const createCategory = async (payload: TCategory): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/category`, payload);

    revalidateTag("categories");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update category");
  }
};
export const updateCategory = async (
  payload: Partial<TCategory>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/category/${payload.id}`,
      payload
    );

    revalidateTag("categories");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update category");
  }
};

export const deleteCategory = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/category/${id}`);

    revalidateTag("categories");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete category");
  }
};
