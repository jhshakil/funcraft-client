import { Home, Mail, SquareChartGantt } from "lucide-react";
import Link from "next/link";

const Navigation = [
  {
    name: "Home",
    path: "/",
    icon: <Home className="text-primary" />,
  },
  {
    name: "About us",
    path: "/about-us",
    icon: <SquareChartGantt className="text-primary" />,
  },
  {
    name: "Contact us",
    path: "/contact-us",
    icon: <Mail className="text-primary" />,
  },
];

const HomeSidebarNavigation = () => {
  return (
    <div className="bg-background p-4 rounded-lg">
      <ul className="flex flex-col">
        {Navigation?.map((item) => (
          <li
            key={item.path}
            className="border-b border-border py-3 flex gap-3 hover:text-primary"
          >
            {item.icon}
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeSidebarNavigation;
