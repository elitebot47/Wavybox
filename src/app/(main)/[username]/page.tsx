import ProfilePage from "./profilepage";
import { prisma } from "@/lib/prisma";

export default async function UserProfilePage({ params }) {
  const { username } = params;
  const userPlusPosts = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
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
    },
  });

  return (
    <div>
      <ProfilePage username={username} userPlusPosts={userPlusPosts} />
    </div>
  );
}
