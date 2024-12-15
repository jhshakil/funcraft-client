import { createAddress, updateAddress } from "@/services/DeliveryAddress";
import { TDeliveryAddress } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateAddress = () => {
  return useMutation<any, Error, TDeliveryAddress>({
    mutationKey: ["CREATE_ADDRESS"],
    mutationFn: async (postData) => await createAddress(postData),
    onSuccess: () => {
      toast.success("Address create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateAddress = () => {
  return useMutation<any, Error, Partial<TDeliveryAddress>>({
    mutationKey: ["UPDATE_ADDRESS"],
    mutationFn: async (postData) => await updateAddress(postData),
    onSuccess: () => {
      toast.success("Address update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
