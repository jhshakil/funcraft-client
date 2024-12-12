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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TMeta } from "@/types/meta.type";
import { calculatePages, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TProductData } from "@/types/product.types";
import { Images, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { EditProduct } from "./EditProduct";
import { TCategory } from "@/types/category.type";
import { useDeleteProduct } from "@/hooks/product.hook";

type Props = {
  products: TProductData[];
  meta: TMeta;
  currentPage: string;
  path: string;
  categories: TCategory[];
};

const VendorProductList = ({
  products,
  meta,
  currentPage,
  path,
  categories,
}: Props) => {
  const [editProOpen, setEditProOpen] = useState(false);
  const [selectedPro, setSelectedPro] = useState<TProductData>();

  const { mutate: handleDelete } = useDeleteProduct();

  const totalPage = calculatePages(meta.total, meta.limit);
  const start = Math.max(0, Number(currentPage) - 2);
  const end = Math.min(totalPage, start + 3);
  const adjustedStart = Math.max(0, end - 3);
  const visibleItems = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  ).slice(adjustedStart, end);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Ratting</TableHead>
            <TableHead>Total Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={product?.thumbnailImage as string}
                    alt={product?.name}
                  />
                  <AvatarFallback>
                    <Images />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>category</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell>{product?.inventoryCount}</TableCell>
              <TableCell>{product.discount}</TableCell>
              <TableCell>{product.ratting}</TableCell>
              <TableCell>{product.reviewCount}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell className="text-right">
                <div className={cn("flex justify-end items-center gap-2")}>
                  <Button
                    size={"icon"}
                    onClick={() => {
                      setEditProOpen(true);
                      setSelectedPro(product);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size={"icon"}
                    onClick={() => handleDelete({ id: product.id })}
                  >
                    <Trash size={16} />
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
      <EditProduct
        open={editProOpen}
        setOpen={setEditProOpen}
        productData={selectedPro as TProductData}
        categories={categories}
      />
    </>
  );
};

export default VendorProductList;
