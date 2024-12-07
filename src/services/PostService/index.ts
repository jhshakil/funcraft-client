"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import {
  TPost,
  TPostAction,
  TPostComment,
  TPostRatting,
} from "@/types/post.types";
import { revalidateTag } from "next/cache";

export const createFullPost = async (payload: TPost): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post", payload);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

export const getAllPost = async (email = "") => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/post?user=${email}`,
    fetchOption
  );

  return res.json();
};

export const getMostUpVotePost = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/post?sort=-totalUpVote`,
    fetchOption
  );

  return res.json();
};

export const getAllPostClient = async (payload: {
  searchTerm: string;
  email?: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(
      `/post?user=${payload?.email}&searchTerm=${payload.searchTerm}`
    );

    return data;
  } catch (error: any) {
    throw new Error("Failed to update post");
  }
};

export const getUserPost = async (email: string) => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(`${envConfig.baseUrl}/post/${email}`, fetchOption);

  return res.json();
};

export const getSinglePost = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/post/single/${id}`,
    fetchOption
  );

  return res.json();
};

export const updatePost = async (payload: Partial<TPost>): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/post/${payload._id}`, payload);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/post/${id}`);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post");
  }
};

export const updateAction = async (
  id: string,
  payload: Partial<TPostAction>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/post/action/${id}`, payload);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update action");
  }
};

export const createComment = async (
  id: string,
  payload: Partial<TPostComment>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/post/comment/${id}`, payload);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to create comment");
  }
};
export const updateComment = async (
  id: string,
  cid: string,
  payload: Partial<TPostComment>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/post/comment/${id}?cid=${cid}`,
      payload
    );

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to update comment");
  }
};
export const deleteComment = async (id: string, cid: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(
      `/post/comment/${id}?cid=${cid}`
    );

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to delete comment");
  }
};

export const createRatting = async (
  id: string,
  payload: Partial<TPostRatting>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/post/ratting/${id}`, payload);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error("Failed to ratting");
  }
};
