import { TProductData } from "./product.types";
import { TVendorData } from "./user.types";

export type TShop = {
  id?: string;
  vendorId?: string;
  vendor: TVendorData;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  status?: "ACTIVE" | "BLOCKED" | "DISABLE";
  product?: TProductData[];
  createdAt?: string;
  updateAt?: string;
};
