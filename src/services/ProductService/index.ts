"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TProductData } from "@/types/product.types";
import { revalidateTag } from "next/cache";

export const getAllProductByShopId = async ({
  page,
  shopId,
}: {
  page?: string;
  shopId: string;
}) => {
  const fetchOption = {
    next: {
      tags: ["products"],
    },
  };

  const url = new URL(`${envConfig.baseUrl}/product/shop/${shopId}`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const createProduct = async (payload: TProductData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/product`, payload);

    revalidateTag("products");

    return data;
  } catch (error: any) {
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async (
  payload: Partial<TProductData>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/product/${payload.id}`,
      payload
    );

    revalidateTag("products");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update product");
  }
};
export const deleteProduct = async (
  payload: Partial<TProductData>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/product/${payload.id}`);

    revalidateTag("products");

    return data;
  } catch (error: any) {
    throw new Error("Failed to delete product");
  }
};
