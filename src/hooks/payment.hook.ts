import { makePayment } from "@/services/PaymentService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMakePayment = () => {
  return useMutation<any, Error, { orderId: string }>({
    mutationKey: ["PAYMENT"],
    mutationFn: async (productData) => await makePayment(productData),
    onSuccess: () => {
      toast.success("Proceed to payment");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
