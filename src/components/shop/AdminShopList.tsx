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

import { TShop } from "@/types/shop.type";
import { useUpdateShopStatus } from "@/hooks/shop.hook";

type Props = {
  shops: TShop[];
  meta: TMeta;
  currentPage: string;
  path: string;
};

const AdminShopList = ({ shops, meta, currentPage, path }: Props) => {
  const { mutate: handleUpdateStatus } = useUpdateShopStatus();

  if (!shops?.length) return <p>No Shop Found</p>;

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
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Vendor Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell className="font-medium">{shop?.id}</TableCell>
            <TableCell>{shop?.name}</TableCell>

            <TableCell>{shop?.description}</TableCell>
            <TableCell>{shop?.vendor?.email}</TableCell>
            <TableCell>{shop.status}</TableCell>

            <TableCell className="text-right flex justify-end items-center gap-2">
              <div className={cn("flex justify-end items-center gap-2")}>
                <Button
                  className={cn(shop.status === "ACTIVE" ? "hidden" : "")}
                  onClick={() =>
                    handleUpdateStatus({
                      id: shop.id,
                      status: "ACTIVE",
                    })
                  }
                >
                  ACTIVE
                </Button>

                <Button
                  className={cn(shop.status === "DISABLE" ? "hidden" : "")}
                  variant={"outline"}
                  onClick={() =>
                    handleUpdateStatus({
                      id: shop.id,
                      status: "BLOCKED",
                    })
                  }
                >
                  DISABLE
                </Button>
                <Button
                  className={cn(shop.status === "BLOCKED" ? "hidden" : "")}
                  variant={"secondary"}
                  onClick={() =>
                    handleUpdateStatus({
                      id: shop.id,
                      status: "BLOCKED",
                    })
                  }
                >
                  BLOCKED
                </Button>
              </div>
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

export default AdminShopList;
