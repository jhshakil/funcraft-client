import DashboardNav from "@/components/shared/DashboardNav";
import { getCurrentUser } from "@/services/AuthService";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="px-8 lg:px-0">
          <DashboardNav role={user?.role} />
        </div>
        <div className="flex-1 lg:pl-[240px]">
          <div className="px-11">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
