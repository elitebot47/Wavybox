"use client";
import { UserPost } from "@/types";
import Post from "./post";
import { postImage } from "@/types";
export default function PostArea({
  posts,
  userid,
}: {
  posts: UserPost<postImage>[];
  userid: number;
}) {
  return (
    <div className=" p-4 flex flex-col gap-3   overflow-hidden">
      {posts.map((post) => (
        <Post
          key={post.id}
          images={post.images}
          username={post.author.username}
          content={post.content}
          createdAt={post.createdAt.getTime()}
          userId={userid}
        />
      ))}
    </div>
  );
}
