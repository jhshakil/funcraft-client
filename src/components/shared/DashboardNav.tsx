"use client";

import { getCurrentUser } from "@/services/AuthService";
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
  UserPen,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden justify-start"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent role={role} />
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "fixed hidden h-screen lg:flex",
          isCollapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        <SidebarContent
          role={role}
          // isCollapsed={isCollapsed}
          // setIsCollapsed={setIsCollapsed}
        />
      </aside>
    </>
  );
};

function SidebarContent({
  isCollapsed,
  setIsCollapsed,
  role,
}: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col border-r bg-white">
      {/* <div className="flex h-[60px] items-center border-b px-4">
        {setIsCollapsed && (
          <Button
            variant="ghost"
            className="ml-auto h-8 w-8 p-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div> */}

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
              className={cn(
                "h-9 w-full justify-start",
                isCollapsed && "h-9 w-9 justify-center p-0"
              )}
            >
              <Link href={item.path}>
                {item.icon && (
                  <item.icon
                    className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")}
                  />
                )}
                {!isCollapsed && <span className="flex-1">{item.name}</span>}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

export default DashboardNav;
