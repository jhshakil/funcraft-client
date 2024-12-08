"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  TAdminData,
  TCustomerData,
  TUserData,
  TVendorData,
} from "@/types/user.types";

type Props = {
  role: string;
  userData?: TAdminData | TVendorData | TCustomerData;
};

const TopBarAction = ({ role, userData }: Props) => {
  return (
    <>
      {userData?.id ? (
        <>
          <ThemeMode />
          <ProfileAction role={role} userData={userData} />
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
