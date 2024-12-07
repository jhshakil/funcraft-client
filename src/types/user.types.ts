export type TUser = {
  _id?: string;
  email: string;
  username: string;
  role: string;
  status?: TUserStatus;
};

export type TUserStatus = "active" | "inActive" | "blocked";

export type TUserData = {
  _id: string;
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
  _id: string;
  authId?: TUser;
  email: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
};
