import { getCurrentUser } from "@/services/AuthService";
import Link from "next/link";

const ANav = [
  {
    name: "Profile",
    path: "/admin/profile",
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "All Users",
    path: "/admin/user-list",
  },
];

const SNav = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },

  {
    name: "Create Admin",
    path: "/admin/create-admin",
  },
  {
    name: "All Users",
    path: "/admin/user-list",
  },
  {
    name: "All Admin",
    path: "/admin/admin-list",
  },
];

const DashboardNav = async () => {
  const user = await getCurrentUser();
  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2 flex justify-between gap-8">
          <h2 className="text-2xl">Admin</h2>
        </div>
      </div>
      <div>
        <ul>
          {(user?.role === "ADMIN" ? ANav : SNav)?.map((el) => (
            <li key={el.path} className="py-2 border-b border-border">
              <Link href={el.path}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNav;
