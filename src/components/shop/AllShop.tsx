"use client";

import { TShop } from "@/types/shop.type";
import ShopCard from "./ShopCard";

type Props = {
  shops: TShop[];
};

const AllShop = ({ shops }: Props) => {
  return (
    <div className="px-4 py-8 my-10">
      <h1 className="text-2xl font-bold mb-6">Our Shops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default AllShop;
