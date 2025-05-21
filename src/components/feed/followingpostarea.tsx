import { useSession } from "next-auth/react";
import Post from "./post";

export default function FollowingPosts({ posts }) {
  const { data: session } = useSession();
  if (!session?.user?.id) return null;

  const followingposts = posts.filter((post) =>
    post.author.followers.some(
      (follower) => follower.followerId == session.user.id
    )
  );

  return (
    <div>
      {followingposts.map((post) => (
        <Post
          avatarUrl={post.author.avatarUrl}
          key={post.id}
          id={post.id}
          images={post.images}
          username={post.author.username}
          content={post.content}
          createdAt={`${new Date(post.createdAt).getTime()}`}
        ></Post>
      ))}
    </div>
  );
}
