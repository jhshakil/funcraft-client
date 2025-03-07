"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import { cn } from "@/lib/utils";
import { TCartData } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { cartData, updateCartData } = useUser();

  const updateQuantity = (product: TCartData, increase: boolean) => {
    const findDuplicate = cartData?.find((el) => el.id === product.id);
    if (findDuplicate) {
      const updateOldData = cartData.filter((el) => {
        if (el.id === product.id) {
          if (increase) {
            el.quantity += 1;
          } else {
            el.quantity -= 1;
          }
          el.totalPrice = Number(
            (Number(el.mainPrice) * el.quantity).toFixed(2)
          );
          return el;
        } else {
          return el;
        }
      });
      updateCartData(updateOldData);
    }
  };

  const removeCart = (productId: string) => {
    const updateData = cartData?.filter((el) => el.id !== productId);

    updateCartData(updateData);
  };

  const totalCheckoutPrice = cartData?.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="mt-11">
      <div className="flex justify-between items-center gap-11">
        <h1 className="text-3xl font-bold mb-6">All Carts</h1>
        {cartData && cartData.length ? (
          <div>
            <Link
              href={"/dashboard/user/checkout"}
              className={cn(buttonVariants())}
            >
              Go to checkout
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mt-11 grid grid-cols-1 xl:grid-cols-2 justify-between gap-11">
        {cartData && cartData.length ? (
          <div className="flex flex-col gap-5">
            {cartData?.map((cart) => (
              <div
                key={cart.id}
                className="max-w-[500px] flex flex-col md:flex-row  item-start md:items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
              >
                <div className="w-52 md:w-24 h-52 md:h-24">
                  <Image
                    src={cart?.thumbnailImage as string}
                    alt={cart?.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-semibold">{cart?.name}</h3>
                  <p className="text-sm text-gray-600">
                    Total Price: ${cart?.totalPrice}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(cart, false)}
                      disabled={cart?.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-2 text-sm font-medium">
                      {cart?.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(cart, true)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCart(cart?.id as string)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-11 flex flex-col gap-5">
            <p>No Cart Found</p>
          </div>
        )}

        <div className="w-full">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-border p-2 text-left">
                  Product Name
                </th>
                <th className="border border-border p-2 text-left">Quantity</th>
                <th className="border border-border p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.map((item) => (
                <tr key={item.id}>
                  <td className="border border-border p-2">{item?.name}</td>
                  <td className="border border-border p-2">{item?.quantity}</td>
                  <td className="border border-border p-2">
                    {item?.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td className="border border-border p-2">Total Price</td>
                <td className="border border-border p-2"></td>
                <td className="border border-border p-2">
                  {totalCheckoutPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
