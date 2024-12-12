import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/ProductService";
import { TProductData } from "@/types/product.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation<any, Error, TProductData>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (postData) => await createProduct(postData),
    onSuccess: () => {
      toast.success("Product create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateProduct = () => {
  return useMutation<any, Error, Partial<TProductData>>({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async (postData) => await updateProduct(postData),
    onSuccess: () => {
      toast.success("Product update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation<any, Error, Partial<TProductData>>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async (postData) => await deleteProduct(postData),
    onSuccess: () => {
      toast.success("Product delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
