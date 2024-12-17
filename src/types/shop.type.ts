import { TProductData } from "./product.types";

export type TShop = {
  id?: string;
  vendorId?: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  status?: "ACTIVE" | "BLOCKED" | "DISABLE";
  product?: TProductData[];
  createdAt?: string;
  updateAt?: string;
};
