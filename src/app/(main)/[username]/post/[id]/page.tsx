"use client";

import { useEffect, useState } from "react";
import Post from "@/components/feed/post";
import axios from "axios";
import Loader from "@/components/ui/loader";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
        <Skeleton className=" w-3xl h-[100vh]" />
      </div>
    );

  return (
    <div>
      <Post
        id={post.id}
        images={post.images}
        username={post.author.username}
        content={post.content}
        createdAt={new Date(post.createdAt).getTime()}
        userId={post.author.id}
      />
    </div>
  );
}
