import CouponCard from "@/components/coupon/CouponCard";
import { CreateCoupon } from "@/components/coupon/CreateCoupon";
import { getAllCoupon } from "@/services/CouponService";

const page = async () => {
  const coupons = await getAllCoupon();
  console.log(coupons);
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Coupons</h1>
      </div>
      <div className="mt-11">
        <CreateCoupon />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {coupons?.data?.map((el) => (
          <CouponCard key={el.id} coupon={el} />
        ))}
      </div>
    </div>
  );
};

export default page;
