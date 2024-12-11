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
import { TCategory } from "@/types/category.type";
import { useState } from "react";
import { EditCategory } from "./EditCategory";
import { useDeleteCategory } from "@/hooks/category.hook";

type Props = {
  categories: TCategory[];
  meta: TMeta;
  currentPage: string;
  path: string;
};

const CategoryList = ({ categories, meta, currentPage, path }: Props) => {
  const [editCatOpen, setEditCatOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<TCategory>();

  const { mutate: handleDelete } = useDeleteCategory();

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
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category?.name}</TableCell>
              <TableCell>{category?.description}</TableCell>
              <TableCell className="text-right">
                <div className={cn("flex justify-end items-center gap-2")}>
                  <Button
                    onClick={() => {
                      setEditCatOpen(true);
                      setSelectedCat(category);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant={"secondary"}
                    onClick={() => handleDelete(category.id as string)}
                  >
                    DELETE
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
            <TableCell colSpan={6} className="text-right">
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
                    <PaginationItem key={`user-pagination_${el}`}>
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
      <EditCategory
        open={editCatOpen}
        setOpen={setEditCatOpen}
        categoryData={selectedCat as TCategory}
      />
    </>
  );
};

export default CategoryList;
