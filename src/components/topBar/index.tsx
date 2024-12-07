import React from "react";
import Logo from "../shared/Logo";
import MainSearch from "./MainSearch";
import TopBarAction from "./TopBarAction";
import { getCurrentUser } from "@/services/AuthService";
import { getAdmin, getUser } from "@/services/UserService";
import { TAdminData, TUserData } from "@/types/user.types";
import Navbar from "./Navbar";

const TopBar = async () => {
  const user = await getCurrentUser();

  let userData: TUserData | TAdminData | null = null;

  try {
    if (user?.role === "admin") {
      const { data } = await getAdmin(user?.email as string);
      userData = data;
    } else {
      const { data } = await getUser(user?.email as string);
      userData = data;
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return (
    <header className="w-full py-6 bg-background">
      <div className="container mx-auto px-2 flex justify-between items-center gap-3 md:gap-8">
        <div className="mr-5">
          <Logo />
        </div>
        <div className="flex-1">
          <Navbar />
        </div>

        <div className="flex justify-end gap-2 items-center">
          <MainSearch userEmail={user?.email} />
          <TopBarAction
            username={user?.username}
            role={user?.role}
            userData={userData}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
