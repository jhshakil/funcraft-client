import { createShop } from "@/services/ShopService";
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
