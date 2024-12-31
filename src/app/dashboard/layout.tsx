import DashboardNav from "@/components/shared/DashboardNav";
import DashboardTopBar from "@/components/topBar/DashboardTopBar";
import { getCurrentUser } from "@/services/AuthService";
import { getShopByVendorId } from "@/services/ShopService";
import { getUser } from "@/services/UserService";
import { TAdminData, TCustomerData, TVendorData } from "@/types/user.types";

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
    <div>
      <DashboardTopBar user={user} userData={userData} shop={shop.data} />
      <div className="flex flex-col xl:flex-row min-h-[80vh]">
        <div className="px-2 lg:px-0">
          <DashboardNav role={user?.role} />
        </div>
        <div className="flex-1 xl:pl-[240px]">
          <div className="px-4 md:px-8 lg:px-11">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
