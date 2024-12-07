"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TContact } from "@/types/contact.type";

export const contactUsPost = async (payload: TContact): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/contact", payload);

    return data;
  } catch (error: any) {
    throw new Error("Failed to send message");
  }
};
