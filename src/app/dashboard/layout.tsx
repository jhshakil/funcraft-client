import DashboardNav from "@/components/shared/DashboardNav";
import { getCurrentUser } from "@/services/AuthService";
import { getShopByVendorId } from "@/services/ShopService";
import { getUser } from "@/services/UserService";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";
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

  return (
    <SidebarProvider>
      <DashboardNav role={user?.role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <TopBarAction
            role={user?.role as string}
            userData={userData?.data}
            shopId={shop?.id as string}
          />
        </header>
        <div className="px-4 md:px-8 lg:px-11 py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
