"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TMeta } from "@/types/meta.type";
import { calculatePages, cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { TOrder } from "@/types/order.type";
import { useCancelOrder, useUpdateOrderStatus } from "@/hooks/order.hook";
import PaymentCard from "../shared/PaymentCard";

type Props = {
  orders: TOrder[];
  meta: TMeta;
  currentPage: string;
  path: string;
};

const UserOrderList = ({ orders, meta, currentPage, path }: Props) => {
  const { mutate: handleUpdateStatus } = useUpdateOrderStatus();
  const { mutate: handleCancel } = useCancelOrder();

  if (!orders?.length) return <p>No Order Found</p>;

  const totalPage = calculatePages(meta?.total, meta?.limit);
  const start = Math.max(0, Number(currentPage) - 2);
  const end = Math.min(totalPage, start + 3);
  const adjustedStart = Math.max(0, end - 3);
  const visibleItems = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  ).slice(adjustedStart, end);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Delivery Address</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order?.id}</TableCell>
            <TableCell>{order?.customer?.name}</TableCell>
            <TableCell>
              {order?.orderProduct?.map((item) => (
                <p key={item.id} className="mt-1">
                  {item?.product?.name}
                </p>
              ))}
            </TableCell>
            <TableCell>{order?.deliveryAddress?.address}</TableCell>
            <TableCell>{order?.totalPrice}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
            <TableCell>
              {order.paymentStatus === "PAID" ? (
                order.paymentStatus
              ) : (
                <PaymentCard orderId={order?.id as string} />
              )}
            </TableCell>

            <TableCell className="text-right flex justify-end items-center gap-2">
              {order.orderStatus !== "DELIVERED" ? (
                <div className={cn("flex justify-end items-center gap-2")}>
                  <Button
                    className={cn(
                      order.orderStatus === "CANCEL" ? "hidden" : ""
                    )}
                    variant={"outline"}
                    onClick={() =>
                      handleCancel({
                        id: order.id,
                      })
                    }
                  >
                    CANCEL
                  </Button>
                </div>
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total:</TableCell>
          <TableCell>{meta.total}</TableCell>
          <TableCell colSpan={8} className="text-right">
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`${path}?page=${
                      Number(currentPage) < 2 ? 1 : Number(currentPage) - 1
                    }`}
                  />
                </PaginationItem>
                {visibleItems.map((el) => (
                  <PaginationItem key={`product-pagination_${el}`}>
                    <PaginationLink
                      href={`${path}?page=${el}`}
                      isActive={el === meta.page}
                    >
                      {el}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={`${path}?page=${
                      Number(currentPage) === totalPage
                        ? totalPage
                        : Number(currentPage) < totalPage
                        ? Number(currentPage) + 1
                        : totalPage
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UserOrderList;
