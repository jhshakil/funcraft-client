"use client";

import {
  ClipboardList,
  Code,
  CreditCard,
  FileUser,
  MapPinHouse,
  ShoppingBag,
  Star,
  UserPen,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const DashboardNav = ({ role }: Props) => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="mt-6 px-2">
        <SidebarMenu>
          {(role === "ADMIN" || role === "SUPER_ADMIN"
            ? adminRoutes
            : role === "VENDOR"
            ? vendorRoutes
            : userRoutes
          )?.map((item, j) => (
            <SidebarMenuItem key={j}>
              <SidebarMenuButton
                asChild
                className="text-base font-medium"
                isActive={
                  item.name === "Dashboard" &&
                  (lastSegment === "user" ||
                    lastSegment === "vendor" ||
                    lastSegment === "admin")
                    ? true
                    : item.name.toLocaleLowerCase() ===
                      lastSegment?.toLowerCase()
                }
              >
                <Link href={item.path}>{item.name}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardNav;
