import Post from "@/components/feed/post";
import { prisma } from "@/lib/prisma";
export default async function Postview({
  params,
}: {
  params: { id: number; username: string };
}) {
  const { id, username } = params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      images: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          avatarUrl: true,
        },
      },
    },
  });

  return (
    <div className=" flex flex-col    overflow-hidden border-t-0">
      <Post
        avatarUrl={String(post.author.avatarUrl ?? "")}
        id={Number(id)}
        images={post.images}
        username={String(username)}
        content={String(post.content)}
        createdAt={`${new Date(post.createdAt).getTime()}`}
      />
    </div>
  );
}
