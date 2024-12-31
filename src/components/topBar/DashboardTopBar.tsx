"use client";

import {
  TAdminData,
  TCustomerData,
  TUser,
  TVendorData,
} from "@/types/user.types";
import Logo from "../shared/Logo";
import TopBarAction from "./TopBarAction";
import { TShop } from "@/types/shop.type";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "../shared/DashboardNav";
import { useState } from "react";

type Props = {
  user: TUser | null;
  userData: { data: TAdminData | TVendorData | TCustomerData } | null;
  shop: TShop | null;
};

const DashboardTopBar = ({ user, userData, shop }: Props) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="w-full py-3 md:py-5 px-4 md:px-8 lg:px-11 flex justify-between items-center gap-3 md:gap-8 border-b border-border">
      <div className="mr-5">
        <Logo />
      </div>
      <div className="flex gap-4 items-center">
        <TopBarAction
          role={user?.role as string}
          userData={userData?.data}
          shopId={shop?.id as string}
        />
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:hidden justify-start"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <div className="mt-8">
              <SidebarContent role={user?.role as string} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DashboardTopBar;
