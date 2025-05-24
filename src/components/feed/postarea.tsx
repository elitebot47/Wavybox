"use client";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "../ui/progress";
import Post from "./post";
import { UserPost, PostImage } from "@/types";
import { fetchPosts } from "@/lib/fetchPosts";

interface PostAreaProps {
  initialposts: UserPost<PostImage>[];
  username?: string;
  queryKey?: any[];
  queryParams?: Record<string, any>; //object type with string keys and values of any type
}

export default function PostArea({
  initialposts,
  queryKey,
  queryParams,
}: PostAreaProps) {
  const { data = [], isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(queryParams),
    initialData: initialposts,
  });

  return (
    <div className="!mb-16">
      {isFetching && <Progress className="w-full" />}
      <div className="flex flex-col overflow-hidden border-t-0 border-x-0">
        {data.map((post: UserPost<PostImage>) => (
          <Post
            name={post.author.name}
            avatarUrl={post.author.avatarUrl}
            key={post.id}
            id={post.id}
            images={post.images}
            username={post.author.username}
            content={post.content}
            createdAt={String(new Date(post.createdAt).getTime())}
          />
        ))}
      </div>
    </div>
  );
}
