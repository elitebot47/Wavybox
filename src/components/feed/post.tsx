"use client";

import { formatDistanceToNow } from "date-fns";
import Imagespace from "./imagespace";
import { UserPost } from "@/types";
import { Separator } from "../ui/separator";
export default function Post({
  username,
  content,
  name,
  createdAt,
  userId,
  images,
}: UserPost) {
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
