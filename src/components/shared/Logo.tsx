import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2 items-end">
      <h1 className="text-2xl md:text-3xl font-bold">
        Fun<span className="text-primary">Craft</span>
      </h1>
    </Link>
  );
};

export default Logo;
