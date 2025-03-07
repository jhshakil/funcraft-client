import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Images } from "lucide-react";

const SpecialFeature = () => {
  return (
    <div className="py-[40px] px-4 lg:px-[60px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between items-center gap-20 border-t border-b border-border">
      <div className="flex  items-center gap-3">
        <Avatar className="h-[66px] w-[66px] rounded-none">
          <AvatarImage src={"/images/shipping.png"} alt="Category" />
          <AvatarFallback className="rounded-none">
            <Images />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg capitalize">Free Shipping Orders $260+</h3>
          <p className="text-sm text-muted-foreground">
            A delivery service you can depend on
          </p>
        </div>
      </div>
      <div className="flex  items-center gap-3">
        <Avatar className="h-[66px] w-[66px] rounded-none">
          <AvatarImage src={"/images/customer support.png"} alt="Category" />
          <AvatarFallback className="rounded-none">
            <Images />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg capitalize">Customer Support</h3>
          <p className="text-sm text-muted-foreground">
            Satisfied customers are our best ads
          </p>
        </div>
      </div>
      <div className="flex  items-center gap-3">
        <Avatar className="h-[66px] w-[66px] rounded-none">
          <AvatarImage src={"/images/secure payment.png"} alt="Category" />
          <AvatarFallback className="rounded-none">
            <Images />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg capitalize">100% Secure Payments</h3>
          <p className="text-sm text-muted-foreground">
            The highest level of security
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialFeature;
