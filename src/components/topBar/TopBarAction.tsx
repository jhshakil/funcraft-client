"use client";

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
          <ProfileAction
            role={role}
            userData={userData}
            shopId={shopId as string}
          />
        </>
      ) : (
        <>
          <Link
            href={"/login"}
            className={cn(
              buttonVariants(),
              "h-8 px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm"
            )}
          >
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default TopBarAction;
