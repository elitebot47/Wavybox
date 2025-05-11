"use client";
import { UserPost, postImage } from "@/types";
import Post from "./post";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";

async function FetchPosts() {
  try {
    const response = await axios.get("/api/post");
    return response.data.posts;
  } catch (error) {
    console.log("error while fetching posts");
  }
}
export default function PostArea({
  initialposts,
  userid,
}: {
  initialposts: UserPost<postImage>[];
  userid: number;
}) {
  const { data: posts = [], isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: FetchPosts,
    initialData: initialposts,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ layout: { duration: 0.5 }, opacity: { duration: 0.3 } }}
      className=" flex flex-col    overflow-hidden border-t-0"
    >
      {isFetching && (
        <div className="flex justify-center py-1">
          <Loader2 className="animate-spin"></Loader2>
        </div>
      )}
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          images={post.images}
          username={post.author.username}
          content={post.content}
          createdAt={new Date(post.createdAt).getTime()}
          userId={userid}
        />
      ))}
    </motion.div>
  );
}
