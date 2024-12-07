import { TUserData } from "./user.types";

export type TPost = {
  _id?: string;
  userId?: TUserData | string;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: TTag[];
  status: TPostStatus;
  isPro?: boolean;
  totalUpVote?: string;
  totalDownVote?: string;
  totalComment?: string;
  averageRatting?: string;
  action?: TPostAction[];
  comment?: TPostComment[];
  ratting?: TPostRatting[];
  createdAt?: string;
};

export type TTag = {
  id: string;
  text: string;
};

export type TPostAction = {
  type: string;
  userId: string;
};

export type TPostComment = {
  _id?: string;
  text: string;
  userId: TUserData | string;
  createdAt?: string;
};

export type TPostRatting = {
  count: string;
  userId: string;
};
export type TPostStatus = "published" | "draft" | "blocked";
