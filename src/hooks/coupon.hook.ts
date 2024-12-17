import {
  createCoupon,
  deleteCoupon,
  getCouponByCode,
} from "@/services/CouponService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCoupon = () => {
  return useMutation<any, Error, { discount: string }>({
    mutationKey: ["CREATE_COUPON"],
    mutationFn: async (postData) => await createCoupon(postData),
    onSuccess: () => {
      toast.success("Coupon create successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetCouponByCode = () => {
  return useMutation<any, Error, { code: string }>({
    mutationKey: ["GET_COUPON_BY_CODE"],
    mutationFn: async (postData) => await getCouponByCode(postData),
    onSuccess: () => {
      toast.success("Coupon get successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteCoupon = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_COUPON"],
    mutationFn: async (postData) => await deleteCoupon(postData),
    onSuccess: () => {
      toast.success("Coupon delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
