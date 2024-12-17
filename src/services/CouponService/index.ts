"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TMeta } from "@/types/meta.type";
import { TCoupon } from "@/types/product.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

export const getAllCoupon = async (): Promise<{
  data: TCoupon[];
}> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["coupons"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/coupon/`);

  const res = await fetch(url.toString(), fetchOption);

  if (!res.ok) {
    toast("Failed to get data");
  }

  return res.json();
};

export const createCoupon = async (payload: {
  discount: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/coupon`, payload);

    revalidateTag("coupons");

    return data;
  } catch (error: any) {
    throw new Error("Failed to create coupon");
  }
};

export const getCouponByCode = async (payload: {
  code: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/coupon/code/`, payload);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get coupon");
  }
};
export const deleteCoupon = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/coupon/${id}`);

    revalidateTag("coupons");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete coupon");
  }
};
