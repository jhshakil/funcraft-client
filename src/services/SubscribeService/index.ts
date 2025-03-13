"use server";

import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const createSubscribe = async (payload: {
  email: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/subscribe`, payload);

    revalidateTag("subscribes");

    return data;
  } catch (error: any) {
    throw new Error("Failed to subscribe");
  }
};
