"use client";
import { UserPost, postImage } from "@/types";
import Post from "./post";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="!mb-16"
    >
      <AnimatePresence>
        {isFetching && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex justify-center py-2"
          >
            <Loader2 className="animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex flex-col  overflow-hidden border-t-0 border-x-0"
      >
        {posts.map((post) => (
          <Post 
            avatarUrl={post.author.avatarUrl}
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
    </motion.div>
  );
}
