import { createSubscribe } from "@/services/SubscribeService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSubscribe = () => {
  return useMutation<any, Error, { email: string }>({
    mutationKey: ["CREATE_SUBSCRIBE"],
    mutationFn: async (postData) => await createSubscribe(postData),
    onSuccess: () => {
      toast.success("Subscribe successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
