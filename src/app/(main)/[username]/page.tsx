import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UpperProfile from "@/components/profilepage/upperhalf";
import LowerProfile from "@/components/profilepage/lowerhalf";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();
  if (!session) {
    return <div>Not authenticated , go to Signin page</div>;
  }
  const { username } = params;

  const userPlusPosts = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
      avatarUrl: true,
      createdAt: true,
      posts: {
        select: {
          author: {
            select: {
              avatarUrl: true,
              username: true,
            },
          },
          id: true,
          content: true,
          createdAt: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      following: true,
      followers: true,
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <UpperProfile initialData={userPlusPosts}></UpperProfile>
      <LowerProfile userPlusPosts={userPlusPosts}></LowerProfile>
    </div>
  );
}
