import PostArea from "@/components/feed/postarea";
import Postform from "@/components/feed/postform";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Post as PostType } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
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
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col  ">
      <Postform userid={session.user.id} />
      <PostArea userid={session.user.id} intialposts={posts} />
    </div>
  );
}
