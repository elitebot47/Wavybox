// src/store/postStore.ts
import { create } from "zustand";
import { Post } from "@prisma/client";

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  clearPosts: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  clearPosts: () => set({ posts: [] }),
}));
