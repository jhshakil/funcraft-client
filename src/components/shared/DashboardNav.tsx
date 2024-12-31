"use client";

import Link from "next/link";
import {
  ClipboardList,
  Code,
  CreditCard,
  FileUser,
  LogOut,
  MapPinHouse,
  Menu,
  ShoppingBag,
  Star,
  UserPen,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

const userRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/dashboard/user/profile",
    icon: UserPen,
  },
  {
    name: "Orders",
    path: "/dashboard/user/orders",
    icon: Users,
  },
  {
    name: "Reviews",
    path: "/dashboard/user/reviews",
    icon: Star,
  },
  {
    name: "Delivery Address",
    path: "/dashboard/user/delivery-address",
    icon: MapPinHouse,
  },
];

const adminRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/dashboard/admin/profile",
    icon: UserPen,
  },
  {
    name: "Users",
    path: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Create Admin",
    path: "/dashboard/admin/create-admin",
    icon: FileUser,
  },
  {
    name: "Categories",
    path: "/dashboard/admin/categories",
    icon: ClipboardList,
  },
  {
    name: "Products",
    path: "/dashboard/admin/products",
    icon: Users,
  },
  {
    name: "Orders",
    path: "/dashboard/admin/orders",
    icon: Users,
  },
  {
    name: "Shops",
    path: "/dashboard/admin/shops",
    icon: ShoppingBag,
  },
  {
    name: "Reviews",
    path: "/dashboard/admin/reviews",
    icon: Star,
  },
];
const vendorRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/vendor",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/dashboard/vendor/profile",
    icon: UserPen,
  },
  {
    name: "Orders",
    path: "/dashboard/vendor/orders",
    icon: Users,
  },
  {
    name: "Products",
    path: "/dashboard/vendor/products",
    icon: Users,
  },
  {
    name: "Create Shop",
    path: "/dashboard/vendor/create-shop",
    icon: FileUser,
  },
  {
    name: "Coupons",
    path: "/dashboard/vendor/coupons",
    icon: Code,
  },
];

type Props = {
  role: string;
};

type SidebarContentProps = {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  role?: string;
};

const DashboardNav = ({ role }: Props) => {
  return (
    <>
      <aside className={cn("fixed hidden h-screen xl:flex", "w-[240px]")}>
        <SidebarContent role={role} />
      </aside>
    </>
  );
};

export function SidebarContent({ role }: SidebarContentProps) {
  return (
    <div className="flex h-full w-full flex-col border-r bg-white ">
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-4 px-2">
          {(role === "ADMIN" || role === "SUPER_ADMIN"
            ? adminRoutes
            : role === "VENDOR"
            ? vendorRoutes
            : userRoutes
          )?.map((item, j) => (
            <Button
              key={j}
              variant="ghost"
              asChild
              className={cn("h-9 w-full justify-start")}
            >
              <Link href={item.path}>
                {item.icon && <item.icon className={cn("h-5 w-5 mr-3")} />}
                <span className="flex-1 text-base xl:text-lg">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

export default DashboardNav;
