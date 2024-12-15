"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";

type Props = {
  role: string;
  userData?: TAdminData | TVendorData | TCustomerData;
  shopId?: string;
};

const TopBarAction = ({ role, userData, shopId }: Props) => {
  return (
    <>
      {userData?.id ? (
        <>
          <ThemeMode />
          <ProfileAction
            role={role}
            userData={userData}
            shopId={shopId as string}
          />
        </>
      ) : (
        <>
          <ThemeMode />
          <Link href={"/login"} className={cn(buttonVariants())}>
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default TopBarAction;
