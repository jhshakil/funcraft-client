"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TShop } from "@/types/shop.type";
import { revalidateTag } from "next/cache";

export const createShop = async (payload: TShop): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/shop", payload);

    revalidateTag("shops");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create shop");
  }
};
