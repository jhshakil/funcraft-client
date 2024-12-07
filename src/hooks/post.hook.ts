import {
  createComment,
  createFullPost,
  createRatting,
  deleteComment,
  deletePost,
  getAllPostClient,
  updateAction,
  updateComment,
  updatePost,
} from "@/services/PostService";
import {
  TPost,
  TPostAction,
  TPostComment,
  TPostRatting,
} from "@/types/post.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, TPost>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createFullPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPost = () => {
  return useMutation<any, Error, { searchTerm: string; email?: string }>({
    mutationKey: ["GET_ALL_POST"],
    mutationFn: async (postData) => await getAllPostClient(postData),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, Partial<TPost>>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (postData) => await updatePost(postData),
    onSuccess: () => {
      toast.success("Post update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postData) => await deletePost(postData),
    onSuccess: () => {
      toast.success("Post delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePostAction = () => {
  return useMutation<any, Error, { id: string; action: Partial<TPostAction> }>({
    mutationKey: ["UPDATE_POST_ACTION"],
    mutationFn: async (postData) =>
      await updateAction(postData.id, postData.action),
    onSuccess: () => {
      toast.success("Action update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateComment = () => {
  return useMutation<
    any,
    Error,
    { id: string; comment: Partial<TPostComment> }
  >({
    mutationKey: ["CREATE_POST_COMMENT"],
    mutationFn: async (postData) =>
      await createComment(postData.id, postData.comment),
    onSuccess: () => {
      toast.success("Comment successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { id: string; cid: string; comment: Partial<TPostComment> }
  >({
    mutationKey: ["UPDATE_POST_COMMENT"],
    mutationFn: async (postData) =>
      await updateComment(postData.id, postData.cid, postData.comment),
    onSuccess: () => {
      toast.success("Comment update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteComment = () => {
  return useMutation<any, Error, { id: string; cid: string }>({
    mutationKey: ["DELETE_POST_COMMENT"],
    mutationFn: async (postData) =>
      await deleteComment(postData.id, postData.cid),
    onSuccess: () => {
      toast.success("Comment delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRatting = () => {
  return useMutation<
    any,
    Error,
    { id: string; ratting: Partial<TPostRatting> }
  >({
    mutationKey: ["RATTING"],
    mutationFn: async (postData) =>
      await createRatting(postData.id, postData.ratting),
    onSuccess: () => {
      toast.success("Ratting successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
