"use client";

import {
  ClipboardList,
  Code,
  CreditCard,
  FileUser,
  LogOut,
  MapPinHouse,
  ShoppingBag,
  UserPen,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/user.provider";
import { protectedRoutes } from "@/constant";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";
import AvatarComponent from "../shared/AvatarComponent";
import { cn } from "@/lib/utils";

type Props = {
  role: string;
  userData: TAdminData | TVendorData | TCustomerData;
  shopId: string;
};

const userRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];

const adminRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];
const vendorRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard/vendor",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];

const ProfileAction = ({ role, userData, shopId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <AvatarComponent
            src={userData?.profilePhoto || ""}
            fallback={userData?.name?.[0] || "S"}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="line-clamp-1">
          {userData?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {(role === "ADMIN" || role === "SUPER_ADMIN"
            ? adminRoutes
            : role === "VENDOR"
            ? vendorRoutes
            : userRoutes
          )?.map((item) => (
            <DropdownMenuItem
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "cursor-pointer",
                item.path === "/dashboard/vendor/create-shop" && shopId
                  ? "hidden"
                  : ""
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAction;
