"use client";

import { TCoupon } from "@/types/product.types";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteCoupon } from "@/hooks/coupon.hook";

type Props = {
  coupon: TCoupon;
};

const CouponCard = ({ coupon }: Props) => {
  const { mutate: handleDelete } = useDeleteCoupon();

  return (
    <div className="p-3 border border-border rounded-lg flex justify-between items-center">
      <div>
        <h2 className="text-2xl mb-2">{coupon.code}</h2>
        <p>{coupon.discount}</p>
      </div>
      <Button size={"icon"} onClick={() => handleDelete(coupon?.id as string)}>
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default CouponCard;
