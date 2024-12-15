"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TOrder } from "@/types/order.type";
import { revalidateTag } from "next/cache";

import { cookies } from "next/headers";

export const getAllOrder = async ({ page }: { page?: string }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["orders"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/order`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getOrderByShopId = async ({
  page,
  shopId,
}: {
  page?: string;
  shopId: string;
}) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["orders"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/shop/vendor/${shopId}`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getOrderByCustomer = async ({
  page,
  customerId,
}: {
  page?: string;
  customerId: string;
}) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["orders"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/shop/customer/${customerId}`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const updateOrderStatus = async (
  payload: Partial<TOrder>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/order/${payload.id}`, payload);

    revalidateTag("orders");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update order status");
  }
};
