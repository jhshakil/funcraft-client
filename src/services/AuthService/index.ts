"use server";

import axiosInstance from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerCustomer = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/create-customer",
      userData
    );

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const registerVendor = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user/create-vendor", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const registerAdmin = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user/create-admin", userData);
    revalidateTag("admins");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    const { email, id, role } = decodedToken;

    return {
      email,
      id,
      role,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

export const forgetPassword = async (payload: {
  email: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", payload);

    return data;
  } catch (error: any) {
    throw new Error("User not found");
  }
};

export const resetPassword = async (payload: {
  email: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", payload);

    return data;
  } catch (error: any) {
    throw new Error("User not found");
  }
};
