import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link href={"/"} className="flex gap-2 items-end">
      <h1 className={cn("text-2xl md:text-3xl font-bold", className)}>
        Fun<span className="text-primary">Craft</span>
      </h1>
    </Link>
  );
};

export default Logo;
