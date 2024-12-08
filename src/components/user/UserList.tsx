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
};

const UserList = ({ users, meta }: Props) => {
  const { mutate: handleUpdateStatus } = useUpdateStatus();
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
                    user?.customer?.profileImage ||
                    user?.vendor?.profileImage ||
                    user?.admin?.profileImage
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
              <div className="flex justify-end items-center gap-2">
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
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {Array.from({
                  length: calculatePages(meta.total, meta.limit),
                }).map((_, index) => (
                  <PaginationItem key={`user-pagination_${index}`}>
                    <PaginationLink href="#" isActive={index + 1 === meta.page}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
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
