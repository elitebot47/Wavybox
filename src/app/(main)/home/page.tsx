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

  const posts: PostType[] = await prisma.post.findMany({
    include: {
      author: {
        select: { username: true, avatarUrl: true },
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
  console.log(posts);

  return (
    <div className="flex flex-col  ">
      <Postform className="lg:flex hidden" userid={session.user.id} />
      <PostArea
        initialposts={posts}
        userid={session.user.id}
        queryKey={["allposts"]}
        queryParams={{}}
      />
    </div>
  );
}
