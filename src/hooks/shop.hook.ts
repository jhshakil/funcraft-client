import {
  createShop,
  updateShop,
  updateShopStatus,
} from "@/services/ShopService";
import { TShop } from "@/types/shop.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateShop = () => {
  return useMutation<any, Error, TShop>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (shopData) => await createShop(shopData),
    onSuccess: () => {
      toast.success("Shop created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateShop = () => {
  return useMutation<any, Error, Partial<TShop>>({
    mutationKey: ["UPDATE_SHOP"],
    mutationFn: async (postData) => await updateShop(postData),
    onSuccess: () => {
      toast.success("Shop update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateShopStatus = () => {
  return useMutation<any, Error, Partial<TShop>>({
    mutationKey: ["UPDATE_SHOP_STATUS"],
    mutationFn: async (postData) => await updateShopStatus(postData),
    onSuccess: () => {
      toast.success("Shop status update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
