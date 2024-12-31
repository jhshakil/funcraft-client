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
import { TReview } from "@/types/review.type";
import { useDeleteReview } from "@/hooks/review.hook";

type Props = {
  reviews: TReview[];
  meta: TMeta;
  currentPage: string;
  path: string;
  role?: string;
};

const AdminReviewList = ({ reviews, meta, currentPage, path, role }: Props) => {
  const { mutate: handleDelete } = useDeleteReview();

  if (!reviews?.length) return <p>No Shop Found</p>;

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
          <TableHead>Product Name</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Ratting</TableHead>
          <TableHead>Review</TableHead>
          {role !== "VENDOR" && (
            <TableHead className="text-right">Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium">{review?.id}</TableCell>
            <TableCell>{review?.product?.name}</TableCell>

            <TableCell>{review?.customer?.name}</TableCell>
            <TableCell className="max-w-[300px]">{review?.review}</TableCell>
            <TableCell>{review?.ratting}</TableCell>

            {role !== "VENDOR" && (
              <TableCell className="text-right flex justify-end items-center gap-2">
                <Button onClick={() => handleDelete(review.id as string)}>
                  DELETE
                </Button>
              </TableCell>
            )}
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

export default AdminReviewList;
