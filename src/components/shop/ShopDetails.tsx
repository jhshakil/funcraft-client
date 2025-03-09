"use client";

import { Button } from "../ui/button";
import { Bell, BellOff, Edit } from "lucide-react";
import { ProductCard } from "../product/ProductCard";
import { TShop } from "@/types/shop.type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { EditShop } from "./EditShop";
import { TVendorData } from "@/types/user.types";

const ShopDetails = ({ shop, user }: { shop: TShop; user: TVendorData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-border">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                src={shop?.logo as string}
                alt={shop?.name}
                className="object-cover"
              />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{shop.name}</h1>
          </div>
          <div>
            {user?.id === shop.vendorId ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenEdit(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
                <Button variant="outline" size="sm">
                  <BellOff className="h-4 w-4 mr-2" />
                  Unsubscribe
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-8">
        <h2 className="my-11 text-3xl">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shop.product?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <EditShop open={openEdit} setOpen={setOpenEdit} shop={shop} />
    </div>
  );
};

export default ShopDetails;
