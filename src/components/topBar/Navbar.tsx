import { NavbarConfig } from "@/config/nav.config";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type TNav = {
  name: string;
  path: string;
  elements?: { name: string; path: string }[];
};

const Navbar = () => {
  return (
    <div>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="space-x-3">
          {NavbarConfig?.map((item: TNav, i) =>
            item.elements && item.elements.length ? (
              <NavigationMenuItem key={item.name + i}>
                <NavigationMenuTrigger className="text-base xl:text-lg font-medium hover:text-primary px-2 xl:px-4">
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="shadow-lg">
                  <NavigationMenuList className="pt-6 px-3 pb-3 flex-col items-start space-y-1 space-x-0">
                    {item.elements.map((subNav) => (
                      <NavigationMenuItem key={subNav.path}>
                        <Link href={subNav.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "text-base xl:text-lg hover:text-primary font-normal w-full justify-start"
                            )}
                          >
                            {subNav.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.path}>
                <Link href={item.path as string} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base lg:text-lg font-medium hover:text-primary px-2 xl:px-4"
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
