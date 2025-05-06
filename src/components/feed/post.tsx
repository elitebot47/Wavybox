"use client";

import { formatDistanceToNow } from "date-fns";
import { CldImage } from "next-cloudinary";
import Imagespace from "./imagespace";
interface postImage {
  secureUrl: string;
  publicId: string;
}
interface Postprops {
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
  images: postImage[];
}

export default function Post({
  username,
  content,
  name,
  createdAt,
  userId,
  images,
}: Postprops) {
  const timeago = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  return (
    <div className="flex flex-col ">
      <div className="flex gap-3">
        <div>{username}</div>
        <div>{timeago}</div>
      </div>
      <div>{content}</div>
      {images && (
        <div>
          <Imagespace images={images} />
        </div>
      )}
    </div>
  );
}
