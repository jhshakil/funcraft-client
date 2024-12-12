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
  category?: TCategory[];
  shop?: TShop[];
};
