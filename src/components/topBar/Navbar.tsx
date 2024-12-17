import Link from "next/link";

const NavbarConfig = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Product",
    path: "/product",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-center items-center gap-11 w-full">
        {NavbarConfig?.map((item) => (
          <li
            key={item.path}
            className="text-lg font-medium hover:text-primary"
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
