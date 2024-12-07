import { paymentForPro } from "@/services/PaymentService";
import { TPayment } from "@/types/payment.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProPayment = () => {
  return useMutation<any, Error, TPayment>({
    mutationKey: ["PAYMENT"],
    mutationFn: async (postData) => await paymentForPro(postData),
    onSuccess: () => {
      toast.success("Proceed to payment");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
