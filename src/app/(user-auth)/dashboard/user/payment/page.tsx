import PaymentCard from "@/components/shared/PaymentCard";

type Props = {
  searchParams: {
    orderId: string;
  };
};

const Page = ({ searchParams }: Props) => {
  if (!searchParams?.orderId) return;
  return (
    <div className="mt-5">
      <h1>Make Payment</h1>
      <PaymentCard orderId={searchParams.orderId} />
    </div>
  );
};

export default Page;
