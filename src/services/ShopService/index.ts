"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TShop } from "@/types/shop.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const getShopByVendorId = async (vendorId: string) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["shops"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/shop/vendor/${vendorId}`,
    fetchOption
  );

  return res.json();
};
