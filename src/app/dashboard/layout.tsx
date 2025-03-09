import DashboardNav from "@/components/shared/DashboardNav";
import { getCurrentUser } from "@/services/AuthService";
import { getShopByVendorId } from "@/services/ShopService";
import { getUser } from "@/services/UserService";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TopBarAction from "@/components/topBar/TopBarAction";

const Layout = async ({ children }: { children: React.ReactNode }) => {
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

  const generateRole = (role: string) => {
    if (role === "SUPER_ADMIN") {
      return "Super Admin";
    } else if (role === "ADMIN") {
      return "Admin";
    } else if (role === "CUSTOMER") {
      return "User";
    } else if (role === "VENDOR") {
      return "Vendor";
    }
  };

  return (
    <SidebarProvider>
      <DashboardNav role={user?.role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h2>{generateRole(user?.role)} Dashboard</h2>
          </div>
          <TopBarAction
            role={user?.role as string}
            userData={userData?.data}
            shopId={shop?.id as string}
          />
        </header>
        <div>
          <div className="px-4 md:px-8 lg:px-11">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
