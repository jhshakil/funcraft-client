"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TShop } from "@/types/shop.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllShop = async ({
  page,
  limit,
}: {
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  category?: string;
  limit?: string;
}) => {
  const fetchOption = {
    next: {
      tags: ["shops"],
    },
  };

  const url = new URL(`${envConfig.baseUrl}/shop`);

  if (page) {
    url.searchParams.append("page", page);
  }
  if (limit) {
    url.searchParams.append("limit", limit);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getAllShopByAdmin = async ({
  page,
  limit,
}: {
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  category?: string;
  limit?: string;
}) => {
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

  const url = new URL(`${envConfig.baseUrl}/shop/admin`);

  if (page) {
    url.searchParams.append("page", page);
  }
  if (limit) {
    url.searchParams.append("limit", limit);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getShopById = async (payload: Partial<TShop>): Promise<any> => {
  const fetchOption = {
    next: {
      tags: ["shops"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/shop/${payload.id}`,
    fetchOption
  );

  return res.json();
};

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

export const updateShop = async (payload: Partial<TShop>): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/shop/${payload.id}`, payload);

    revalidateTag("shops");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update shop");
  }
};

export const updateShopStatus = async (
  payload: Partial<TShop>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/shop/status/${payload.id}`,
      payload
    );

    revalidateTag("shops");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update shop status");
  }
};
