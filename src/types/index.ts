export interface PostImage {
  secureUrl: string;
  publicId: string;
}
export interface UserPost<T = PostImage> {
  authorId: number;
  author: [];
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
  images: T[];
  id: number;
  avatarUrl: string;
}
