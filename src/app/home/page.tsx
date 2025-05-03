import Post from "@/components/feed/post";
import Postform from "@/components/feed/postform";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const posts = await prisma.post.findMany();
  const time = Date().localeCompare;
  return (
    <div className="flex flex-col ">
      <Postform userid={session?.user?.id}></Postform>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            username={session?.user.username}
            content={post.content}
            createdAt={post.createdAt.getTime()}
            userId={session?.user?.id}
          />
        ))}
      </div>
    </div>
  );
}
