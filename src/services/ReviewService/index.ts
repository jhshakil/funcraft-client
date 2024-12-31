"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TReview } from "@/types/review.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllReview = async ({ page }: { page: string }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["reviews"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/review`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getAllUserReview = async ({
  page,
  id,
}: {
  page: string;
  id: string;
}) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["reviews"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/review/customer/${id}`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

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

export const getReviewByProductId = async (payload: {
  id: string;
}): Promise<any> => {
  const fetchOption = {
    next: {
      tags: ["reviews"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/review/product/?productId=${payload.id}`,
    fetchOption
  );

  return res.json();
};

export const deleteReview = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/review/${id}`);

    revalidateTag("reviews");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete review");
  }
};
