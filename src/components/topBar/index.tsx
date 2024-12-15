import React from "react";
import Logo from "../shared/Logo";
import MainSearch from "./MainSearch";
import TopBarAction from "./TopBarAction";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";
import Navbar from "./Navbar";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";
import { getShopByVendorId } from "@/services/ShopService";

import CartButton from "./CartButton";

const TopBar = async () => {
  const user = await getCurrentUser();

  let userData: { data: TAdminData | TVendorData | TCustomerData } | null =
    null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }
  const shop = await getShopByVendorId(user?.id as string);

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
          <CartButton />
          <TopBarAction
            role={user?.role}
            userData={userData?.data}
            shopId={shop?.data?.id}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
