"use client";
import { UserPost, postImage } from "@/types";
import Post from "./post";
import { motion } from "framer-motion";

export default function PostArea({
  posts,
  userid,
}: {
  posts: UserPost<postImage>[];
  userid: number;
}) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
      className=" flex flex-col    overflow-hidden border-t-0"
    >
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
    </motion.div>
  );
}
