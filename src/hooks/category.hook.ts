import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/CategoryService";
import { TCategory } from "@/types/category.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation<any, Error, TCategory>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (postData) => await createCategory(postData),
    onSuccess: () => {
      toast.success("Category create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateCategory = () => {
  return useMutation<any, Error, Partial<TCategory>>({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: async (postData) => await updateCategory(postData),
    onSuccess: () => {
      toast.success("Category update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (postData) => await deleteCategory(postData),
    onSuccess: () => {
      toast.success("Category delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
