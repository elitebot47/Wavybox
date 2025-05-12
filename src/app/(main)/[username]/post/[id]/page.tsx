"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Post from "@/components/feed/post";
import axios from "axios";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/ui/loader";
export default function Postview({ params }) {
  const { id, username }: { id: number; username: string } = React.use(params);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function Getposts() {
      const response = await axios.get(`/api/post/${id}`);
      setPost(response.data.post);
    }
    Getposts();
  }, [id]);

  if (!post)
    return (
      <div className="flex justify-center ">
        <Loader className=""></Loader>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 0.8 } }}
      className=" flex flex-col    overflow-hidden border-t-0"
    >
      <Post
        avatarUrl={post.author.avatarUrl}
        id={post.id}
        images={post.images}
        username={post.author.username}
        content={post.content}
        createdAt={new Date(post.createdAt).getTime()}
        userId={post.author.id}
      />
    </motion.div>
  );
}
