import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
  isPro?: boolean;
  badgeClassName?: string;
};

const AvatarComponent = ({
  src,
  className = "w-8 h-8",
  alt = "profile",
  fallback = "S",
  isPro = false,
  badgeClassName = "w-2 h-2",
}: Props) => {
  return (
    <div className="relative">
      <Avatar className={cn(className)}>
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback className="uppercase flex justify-center items-center w-full h-full bg-secondary">
          {fallback}
        </AvatarFallback>
      </Avatar>
      {isPro ? (
        <div className="absolute top-0 right-0 p-0.5 bg-background rounded-full">
          <Crown className={cn("text-primary", badgeClassName)} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AvatarComponent;
