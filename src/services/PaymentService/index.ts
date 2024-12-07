"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TPayment } from "@/types/payment.type";

export const paymentForPro = async (payload: TPayment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/payment", payload);

    return data;
  } catch (error: any) {
    throw new Error("Failed to payment");
  }
};
