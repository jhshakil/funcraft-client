"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TDeliveryAddress } from "@/types/user.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getDeliveryAddressById = async (
  payload: Partial<TDeliveryAddress>
): Promise<any> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["deliveryAddress"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/delivery-address/${payload.id}`,
    fetchOption
  );

  return res.json();
};

export const createAddress = async (
  payload: TDeliveryAddress
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/delivery-address`, payload);

    revalidateTag("deliveryAddress");

    return data;
  } catch (error: any) {
    throw new Error("Failed to create address");
  }
};

export const updateAddress = async (
  payload: Partial<TDeliveryAddress>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/delivery-address/${payload.id}`,
      payload
    );

    revalidateTag("deliveryAddress");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update address");
  }
};
