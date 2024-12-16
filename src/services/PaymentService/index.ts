"use server";

import axiosInstance from "@/lib/axiosInstance";

export const makePayment = async (payload: {
  orderId: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/payment", payload);

    return data;
  } catch (error: any) {
    throw new Error("Failed to payment");
  }
};
