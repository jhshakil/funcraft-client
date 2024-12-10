import {
  followUser,
  unFollowUser,
  updateUser,
  updateUserStatus,
} from "@/services/UserService";
import { TFollow } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (postData) => await updateUser(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateStatus = () => {
  return useMutation<
    any,
    Error,
    {
      id: string;
      status: "ACTIVE" | "BLOCKED" | "DELETED";
    }
  >({
    mutationKey: ["UPDATE_USER_STATUS"],
    mutationFn: async (postData) => await updateUserStatus(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useFollowUser = () => {
  return useMutation<any, Error, TFollow>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (postData) => await followUser(postData),
    onSuccess: () => {
      toast.success("Follow successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnFollowUser = () => {
  return useMutation<any, Error, TFollow>({
    mutationKey: ["UN_FOLLOW"],
    mutationFn: async (postData) => await unFollowUser(postData),
    onSuccess: () => {
      toast.success("UnFollow successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
