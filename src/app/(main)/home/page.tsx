import HomePage from "@/components/feed/homepage";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
          avatarUrl: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
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
      <HomePage initialposts={posts} />
    </div>
  );
}
