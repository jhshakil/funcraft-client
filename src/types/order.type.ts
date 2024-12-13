import { TShop } from "./shop.type";
import { TCustomerData } from "./user.types";

export type TOrder = {
  id?: string;
  customer?: TCustomerData;
  deliveryAddress?: TDeliveryAddress;
  shop: TShop;
  totalPrice: number;
  orderStatus: "PENDING" | "DELIVERED" | "BLOCKED" | "CANCEL";
  paymentStatus: "PAID" | "UNPAID";
};

export type TDeliveryAddress = {
  id?: string;
  customer?: TCustomerData;
  address: string;
};
