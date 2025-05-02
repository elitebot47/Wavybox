import Post from "@/components/feed/post";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const posts = await prisma.post.findMany();
  return (
    <div className="flex ">
      <div>home page</div>
      <div>
        {posts.map((post) => (
          <Post
            username={session?.user.username}
            content={post.content}
            createdAt={post.createdAt}
            userId={session?.user?.id}
          />
        ))}
      </div>
    </div>
  );
}
