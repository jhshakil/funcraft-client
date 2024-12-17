"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const NavbarConfig = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Recent Product",
    path: "/recent-product",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  // {
  //   name: "About",
  //   path: "/about",
  // },
  // {
  //   name: "Contact",
  //   path: "/contact",
  // },
];

const MobileNavbar = () => {
  const [proOpen, setProOpen] = useState(false);

  return (
    <Drawer direction="right" open={proOpen} onOpenChange={setProOpen}>
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full h-screen">
          <DrawerHeader className="flex justify-end">
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerDescription className="hidden"></DrawerDescription>
            <DrawerClose asChild>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="flex flex-col gap-8">
                  {NavbarConfig?.map((item) => (
                    <NavigationMenuLink
                      key={item.path}
                      className={cn(navigationMenuTriggerStyle(), "text-2xl")}
                      onClick={() => setProOpen(false)}
                      asChild
                    >
                      <Link href={item.path}>{item.name}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
