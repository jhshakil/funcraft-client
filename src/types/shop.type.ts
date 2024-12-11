export type TShop = {
  id?: string;
  vendorId?: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  status?: "ACTIVE" | "BLOCKED" | "DISABLE";
  createdAt?: string;
  updateAt?: string;
};
