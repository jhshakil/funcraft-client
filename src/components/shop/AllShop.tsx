"use client";

import { TShop } from "@/types/shop.type";
import ShopCard from "./ShopCard";

type Props = {
  shops: TShop[];
};

const AllShop = ({ shops }: Props) => {
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">All Shops</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shops?.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default AllShop;
