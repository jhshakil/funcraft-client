import { TProductData } from "./product.types";
import { TCustomerData } from "./user.types";

export type TReview = {
  id?: string;
  product?: TProductData;
  customer?: TCustomerData;
  ratting: number;
  review: string;
  createdAt?: string;
};
