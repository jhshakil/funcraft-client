import {
  cancelOrder,
  createOrder,
  updateOrderStatus,
} from "@/services/orderService";
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
export const useCancelOrder = () => {
  return useMutation<any, Error, Partial<TOrder>>({
    mutationKey: ["CANCEL_ORDER_STATUS"],
    mutationFn: async (postData) => await cancelOrder(postData),
    onSuccess: () => {
      toast.success("Order cancel successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateOrder = () => {
  return useMutation<any, Error, TOrder>({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (postData) => await createOrder(postData),
    onSuccess: () => {
      toast.success("Order create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
