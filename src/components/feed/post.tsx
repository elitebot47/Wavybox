"use client";

import { formatDistanceToNow } from "date-fns";
import { CldImage } from "next-cloudinary";
interface Postprops {
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
  imageurl: string;
}

export default function Post({
  username,
  content,
  name,
  createdAt,
  userId,
  imageurl,
}: Postprops) {
  const timeago = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  return (
    <div className="flex flex-col ">
      <div className="flex gap-3">
        <div>{username}</div>
        <div>{timeago}</div>
      </div>
      <div>{content}</div>
      {imageurl && (
        <div className=" w-lg overflow-hidden bg-white border-2 rounded-4xl mx-auto ">
          <CldImage
            className=" mx-auto "
            src={imageurl}
            alt="image"
            width={200}
            height={200}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
