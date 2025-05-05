import Post from "@/components/feed/post";
import Postform from "@/components/feed/postform";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Post as PostType } from "@prisma/client";
import { Image } from "lucide-react";

export default async function Home() {
  const session = await auth();
  let posts: PostType[] = await prisma.post.findMany({
    include: {
      author: {
        select: { username: true },
      },
      images: {
        select: {
          secureUrl: true,
          publicId: true,
        },
      },
    },
  });
  console.log("posts:", posts);

  posts = posts.reverse();
  const userid: number = session.user.id;
  return (
    <div className="flex flex-col ">
      <Postform userid={userid}></Postform>
      <div>
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
      </div>
    </div>
  );
}
