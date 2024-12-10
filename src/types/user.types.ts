export type TUser = {
  id: string;
  email: string;
  role: string;
  status?: TUserStatus;
};

export type TUserStatus = "active" | "inActive" | "blocked";

export type TUserData = {
  id: string;
  email: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: string;
  updateAt: string;
  admin: TAdminData;
  vendor: TVendorData;
  customer: TCustomerData;
};

export type TFollow = {
  userId: string;
};

export type TAdminData = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
};
export type TCustomerData = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
};
export type TVendorData = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
};
