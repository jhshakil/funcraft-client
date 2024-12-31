import { createReview, deleteReview } from "@/services/ReviewService";
import { TReview } from "@/types/review.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateReview = () => {
  return useMutation<any, Error, TReview>({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (postData) => await createReview(postData),
    onSuccess: () => {
      toast.success("Review create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteReview = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_REVIEW"],
    mutationFn: async (postData) => await deleteReview(postData),
    onSuccess: () => {
      toast.success("Review delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
