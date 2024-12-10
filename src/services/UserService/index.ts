"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../AuthService";
import {
  TAdminData,
  TCustomerData,
  TFollow,
  TUserData,
  TVendorData,
} from "@/types/user.types";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { TMeta } from "@/types/meta.type";
import { FieldValues } from "react-hook-form";

export const getUser = async (
  id: string
): Promise<{ data: TAdminData | TVendorData | TCustomerData }> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["user"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const res = await fetch(`${envConfig.baseUrl}/user/${id}`, fetchOption);

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

export const getAllUser = async ({
  page,
}: {
  page?: string;
}): Promise<{
  data: TUserData[];
  meta: TMeta;
}> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["users"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/user`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  if (!res.ok) {
    toast("Failed to get data");
  }

  return res.json();
};

export const updateUser = async (formData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/user/profile`, formData);

    revalidateTag("user");
    revalidateTag("users");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserStatus = async (payload: {
  id: string;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/user/status/${payload.id}`,
      {
        status: payload.status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("users");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update status");
  }
};

export const getAllUnFollow = async (
  email: string
): Promise<{ data: TUserData[] }> => {
  const fetchOption = {
    next: {
      tags: ["unfollow"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/user/unfollow-user/${email}`,
    fetchOption
  );

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

export const getAllFollow = async (
  email: string
): Promise<{ data: TUserData[] }> => {
  const fetchOption = {
    next: {
      tags: ["follow"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/user/follow-user/${email}`,
    fetchOption
  );

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

export const followUser = async (payload: TFollow): Promise<any> => {
  const user = await getCurrentUser();
  try {
    const { data } = await axiosInstance.post(
      `/user/follow/${user?.email}`,
      payload
    );

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to follow");
  }
};

export const unFollowUser = async (payload: TFollow): Promise<any> => {
  const user = await getCurrentUser();
  try {
    const { data } = await axiosInstance.post(
      `/user/unfollow/${user?.email}`,
      payload
    );

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to un-follow");
  }
};
