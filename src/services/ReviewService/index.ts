"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TReview } from "@/types/review.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const checkForReview = async (payload: {
  userId: string;
  productId: string;
}): Promise<any> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    headers: {
      Authorization: accessToken as string,
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/review/review-check?customerId=${payload.userId}&productId=${payload.productId}`,
    fetchOption
  );

  return res.json();
};

export const createReview = async (payload: TReview): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/review`, payload);

    revalidateTag("reviews");

    return data;
  } catch (error: any) {
    throw new Error("Failed to create review");
  }
};
