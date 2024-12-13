import { updateOrderStatus } from "@/services/orderService";
import { TOrder } from "@/types/order.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
  return useMutation<any, Error, Partial<TOrder>>({
    mutationKey: ["UPDATE_ORDER_STATUS"],
    mutationFn: async (postData) => await updateOrderStatus(postData),
    onSuccess: () => {
      toast.success("Order status update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
