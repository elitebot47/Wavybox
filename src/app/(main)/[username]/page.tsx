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
      username: true,
      avatarUrl: true,
      createdAt: true,
      id: true,
      posts: {
        select: {
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
      <ProfilePage userPlusPosts={userPlusPosts} />
    </div>
  );
}
