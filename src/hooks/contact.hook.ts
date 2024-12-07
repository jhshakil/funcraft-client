import { contactUsPost } from "@/services/ContactService";
import { TContact } from "@/types/contact.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContactUs = () => {
  return useMutation<any, Error, TContact>({
    mutationKey: ["CONTACT"],
    mutationFn: async (postData) => await contactUsPost(postData),
    onSuccess: () => {
      toast.success("Email send successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
