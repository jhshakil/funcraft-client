import { TProductData } from "./product.types";
import { TShop } from "./shop.type";
import { TCustomerData } from "./user.types";

export type TOrder = {
  id?: string;
  customerId?: string;
  customer?: TCustomerData;
  deliveryAddressId?: string;
  deliveryAddress?: TDeliveryAddress;
  shopId?: string;
  shop?: TShop;
  totalPrice: number;
  orderStatus?: "PENDING" | "DELIVERED" | "BLOCKED" | "CANCEL";
  paymentStatus?: "PAID" | "UNPAID";
  orderProduct?: TOrderProduct[];
};

export type TDeliveryAddress = {
  id?: string;
  customer?: TCustomerData;
  address: string;
};

export type TOrderProduct = {
  id?: string;
  product?: TProductData;
  productId?: string;
  quantity?: string;
};
