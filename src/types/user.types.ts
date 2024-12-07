export type TUser = {
  _id?: string;
  email: string;
  role: string;
  status?: TUserStatus;
};

export type TUserStatus = "active" | "inActive" | "blocked";

export type TUserData = {
  id: string;
  authId?: TUser;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  phoneNumber: string;
  gender: "male" | "female";
  dateOfBirth: string;
  totalFollower: string;
  totalFollowing: string;
  follower: TFollow[];
  following: TFollow[];
  isPro: boolean;
  proValidity: string;
};

export type TFollow = {
  userId: string;
};

export type TAdminData = {
  id: string;
  authId?: TUser;
  email: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
};
