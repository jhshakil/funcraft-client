import { useMutation } from "@tanstack/react-query";
import {
  forgetPassword,
  loginUser,
  registerAdmin,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful");
    },
    onError: (error) => {
      toast.error("Something went wrong, Please add valid information");
    },
  });
};

export const useAdminRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADMIN_REGISTRATION"],
    mutationFn: async (userData) => await registerAdmin(userData),
    onSuccess: () => {
      toast.success("Admin registration successful");
    },
    onError: (error) => {
      toast.error("Something went wrong, Please add valid information");
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_Login"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, { email: string }>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (postData) => await forgetPassword(postData),
    onSuccess: () => {
      toast.success("Email send successfully, please check your email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, { email: string; password: string }>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (postData) => await resetPassword(postData),
    onSuccess: () => {
      toast.success("Password reset successfully, Please login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
