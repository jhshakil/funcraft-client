"use client";

import { useMakePayment } from "@/hooks/payment.hook";
import { Button } from "../ui/button";

type Props = {
  orderId: string;
};

const PaymentCard = ({ orderId }: Props) => {
  const { mutate: handlePayment, data: paymentData } = useMakePayment();

  if (paymentData && paymentData?.data?.payment_url) {
    window.location.href = paymentData?.data?.payment_url;
  }

  return <Button onClick={() => handlePayment({ orderId })}>Pay Now</Button>;
};

export default PaymentCard;
