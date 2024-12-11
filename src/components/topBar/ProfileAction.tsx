"use client";

import { CreditCard, FileUser, LogOut, UserPen, Users } from "lucide-react";

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
import {
  TAdminData,
  TCustomerData,
  TUserData,
  TVendorData,
} from "@/types/user.types";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  role: string;
  userData: TAdminData | TVendorData | TCustomerData;
};

const userRoutes = [
  {
    name: "Profile",
    path: "/user/profile",
    icon: <UserPen className="mr-2 h-4 w-4" />,
  },
  // {
  //   name: "Settings",
  //   path: "/user/settings",
  //   icon: <Settings className="mr-2 h-4 w-4" />,
  // },
];

const adminRoutes = [
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <UserPen className="mr-2 h-4 w-4" />,
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    name: "Create Admin",
    path: "/admin/create-admin",
    icon: <FileUser className="mr-2 h-4 w-4" />,
  },
];
const vendorRoutes = [
  {
    name: "Profile",
    path: "/vendor/profile",
    icon: <UserPen className="mr-2 h-4 w-4" />,
  },
  {
    name: "Dashboard",
    path: "/vendor/dashboard",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    name: "Orders",
    path: "/vendor/orders",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    name: "Products",
    path: "/vendor/products",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    name: "Create Shop",
    path: "/vendor/create-shop",
    icon: <FileUser className="mr-2 h-4 w-4" />,
  },
];

const ProfileAction = ({ role, userData }: Props) => {
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
              className="cursor-pointer"
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
