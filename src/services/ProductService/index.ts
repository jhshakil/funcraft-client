"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TProductData, TProductQuery } from "@/types/product.types";
import { revalidateTag } from "next/cache";

export const getAllProduct = async ({
  page,
  sortBy,
  sortOrder,
  category,
  limit,
  minPrice,
  maxPrice,
  recent,
  bestSelling,
  topRated,
  flashSales,
  clearance,
  discounts,
}: TProductQuery) => {
  const fetchOption = {
    next: {
      tags: ["products"],
    },
  };

  const url = new URL(`${envConfig.baseUrl}/product`);

  if (page) {
    url.searchParams.append("page", page);
  }
  if (sortBy) {
    url.searchParams.append("sortBy", sortBy);
  }
  if (sortOrder) {
    url.searchParams.append("sortOrder", sortOrder);
  }
  if (category) {
    url.searchParams.append("category", category);
  }
  if (limit) {
    url.searchParams.append("limit", limit);
  }
  if (minPrice) {
    url.searchParams.append("minPrice", minPrice);
  }
  if (maxPrice) {
    url.searchParams.append("limit", maxPrice);
  }
  if (recent) {
    url.searchParams.append("recent", recent);
  }
  if (bestSelling) {
    url.searchParams.append("bestSelling", bestSelling);
  }
  if (topRated) {
    url.searchParams.append("topRated", topRated);
  }
  if (flashSales) {
    url.searchParams.append("flashSales", flashSales);
  }
  if (clearance) {
    url.searchParams.append("clearance", clearance);
  }
  if (discounts) {
    url.searchParams.append("discounts", discounts);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getProductById = async (
  payload: Partial<TProductData>
): Promise<any> => {
  const fetchOption = {
    next: {
      tags: ["products"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/product/${payload.id}`,
    fetchOption
  );

  return res.json();
};

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
export const updateProductStatus = async (
  payload: Partial<TProductData>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/product/status/${payload.id}`,
      payload
    );

    revalidateTag("products");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update status");
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

export const getAllProductClient = async (payload: {
  searchTerm: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(
      `/product?searchTerm=${payload.searchTerm}`
    );

    return data;
  } catch (error: any) {
    throw new Error("Failed to update post");
  }
};
