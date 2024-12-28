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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { NavbarConfig } from "@/config/nav.config";

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
            <NavigationMenu className="justify-start px-11 [&>div]:w-full">
              <NavigationMenuList className="justify-start w-full">
                <NavigationMenuItem className="flex flex-col gap-8 w-full">
                  {NavbarConfig?.map((item, i) =>
                    item.elements && item.elements.length ? (
                      <Accordion
                        key={item.name + i}
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem value="item-1" className="border-0">
                          <AccordionTrigger
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "text-3xl font-normal justify-between data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent hover:bg-transparent gap-1"
                            )}
                          >
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <div className="pt-6 px-3 space-y-3">
                              {item.elements.map((subNav) => (
                                <NavigationMenuItem key={subNav.path}>
                                  <Link
                                    href={subNav.path}
                                    legacyBehavior
                                    passHref
                                  >
                                    <NavigationMenuLink
                                      className={cn(
                                        navigationMenuTriggerStyle(),
                                        "text-2xl hover:text-primary font-normal w-full justify-start"
                                      )}
                                    >
                                      {subNav.name}
                                    </NavigationMenuLink>
                                  </Link>
                                </NavigationMenuItem>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <NavigationMenuLink
                        key={item.path}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-3xl font-normal"
                        )}
                        onClick={() => setProOpen(false)}
                        asChild
                      >
                        <Link href={item.path}>{item.name}</Link>
                      </NavigationMenuLink>
                    )
                  )}
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
