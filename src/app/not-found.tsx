import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background p-11 rounded-lg mt-5">
      <h2 className="text-center text-[42px]">Not Found</h2>
      <p className="text-center text-2xl">
        Could not this page. May be you are in wrong page
      </p>
      <div className="mt-5 flex justify-center">
        <Link href="/" className={cn(buttonVariants())}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
