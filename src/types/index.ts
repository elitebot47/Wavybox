export interface postImage {
  secureUrl: string;
  publicId: string;
}
export interface UserPost<T = postImage> {
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
  images: T[];
  id: number;
}
