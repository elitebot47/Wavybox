"use client";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "../ui/progress";
import Post from "./post";
import { UserPost, postImage } from "@/types";
import { fetchPosts } from "@/lib/fetchPosts";

interface PostAreaProps {
  initialposts: UserPost<postImage>[];
  username?: string;
  queryKey?: any[];
  queryParams?: Record<string, any>; //object type with string keys and values of any type
}

export default function PostArea({
  initialposts,
  username,
  queryKey,
  queryParams,
}: PostAreaProps) {
  const test = fetchPosts(queryParams);
  const { data = [], isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchPosts(queryParams),
    initialData: initialposts,
  });
  console.log(test);

  return (
    <div className="!mb-16">
      {isFetching && <Progress className="w-full" />}
      <div className="flex flex-col overflow-hidden border-t-0 border-x-0">
        {data.map((post: UserPost<postImage>) => (
          <Post
            avatarUrl={post.author.avatarUrl}
            key={post.id}
            id={post.id}
            images={post.images}
            username={post.author.username}
            content={post.content}
            createdAt={new Date(post.createdAt).getTime()}
            userId={post.authorId}
          />
        ))}
      </div>
    </div>
  );
}
