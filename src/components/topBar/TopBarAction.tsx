"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TAdminData, TUserData } from "@/types/user.types";

type Props = {
  username: string;
  role: string;
  userData: TUserData | TAdminData | null;
};

const TopBarAction = ({ username, role, userData }: Props) => {
  return (
    <>
      {username ? (
        <>
          <ThemeMode />
          <ProfileAction username={username} role={role} userData={userData} />
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
