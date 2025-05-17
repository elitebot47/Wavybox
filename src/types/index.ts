export interface postImage {
  secureUrl: string;
  publicId: string;
}
export interface UserPost<T = postImage> {
  authorId: number;
  author: any;
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
  images: T[];
  id: number;
  avatarUrl: string;
}
