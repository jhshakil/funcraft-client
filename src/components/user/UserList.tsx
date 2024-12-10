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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TMeta } from "@/types/meta.type";
import { TUserData } from "@/types/user.types";
import { calculatePages, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { useUpdateStatus } from "@/hooks/user.hook";

type Props = {
  users: TUserData[];
  meta: TMeta;
  currentPage: string;
  path: string;
};

const UserList = ({ users, meta, currentPage, path }: Props) => {
  const { mutate: handleUpdateStatus } = useUpdateStatus();

  const totalPage = calculatePages(meta.total, meta.limit);
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
          <TableHead>Name</TableHead>
          <TableHead>Profile Photo</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              {user?.customer?.name || user?.vendor?.name || user?.admin?.name}
            </TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src={
                    user?.customer?.profilePhoto ||
                    user?.vendor?.profilePhoto ||
                    user?.admin?.profilePhoto
                  }
                  alt={
                    user?.customer?.name ||
                    user?.vendor?.name ||
                    user?.admin?.name
                  }
                />
                <AvatarFallback>
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user?.customer?.address || user?.vendor?.address}
            </TableCell>
            <TableCell>
              {user?.customer?.contactNumber || user?.vendor?.contactNumber}
            </TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-right">
              <div
                className={cn(
                  user.role === "SUPER_ADMIN"
                    ? "hidden"
                    : "flex justify-end items-center gap-2"
                )}
              >
                <Button
                  className={cn(user.status === "ACTIVE" ? "hidden" : "")}
                  onClick={() =>
                    handleUpdateStatus({ id: user.id, status: "ACTIVE" })
                  }
                >
                  Active
                </Button>
                <Button
                  className={cn(user.status === "BLOCKED" ? "hidden" : "")}
                  variant={"outline"}
                  onClick={() =>
                    handleUpdateStatus({ id: user.id, status: "BLOCKED" })
                  }
                >
                  BLOCK
                </Button>
                <Button
                  className={cn(user.status === "DELETED" ? "hidden" : "")}
                  variant={"secondary"}
                  onClick={() =>
                    handleUpdateStatus({ id: user.id, status: "DELETED" })
                  }
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
  );
};

export default UserList;
