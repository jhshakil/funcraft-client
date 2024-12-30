import { TCategory } from "./category.type";
import { TShop } from "./shop.type";

export type TProductData = {
  id?: string;
  categoryId: string;
  shopId?: string;
  name: string;
  description: string;
  thumbnailImage?: string;
  price: number;
  inventoryCount: number;
  discount?: number | null;
  ratting?: number;
  reviewCount?: number;
  size?: string[];
  color?: string[];
  isDeleted?: boolean;
  status: "PUBLISHED" | "DRAFT" | "BLOCKED";
  createdAt?: string;
  updateAt?: string;
  category?: TCategory;
  shop?: TShop;
};

export type TCartData = {
  id?: string;
  shopId?: string;
  name: string;
  thumbnailImage?: string;
  mainPrice: number;
  totalPrice: number;
  quantity: number;
};

export type TCoupon = {
  id?: string;
  code?: string;
  discount: string;
};

export type TProductQuery = {
  sortBy?: string;
  limit?: string;
  sortOrder?: string;
  page?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  flashSales?: string;
};
