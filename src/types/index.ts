import { string } from "zod";

export interface PostImage {
  secureUrl: string;
  publicId: string;
}
export interface Author {
  avatarUrl: string;
  username: string;
}
export interface UserPost<T = PostImage> {
  author?: Author;
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId?: number;
  images: T[];
  id: number;
  avatarUrl: string;
}
