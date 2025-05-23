import ProfileCard from "@/components/profilepage/profilecard";
import { prisma } from "@/lib/prisma";

export default async function FollwingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  console.log(username);

  const userId = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
    },
  });
  console.log("userId", userId);

  const followings = await prisma.follows.findMany({
    where: {
      followerId: userId.id,
    },
    include: {
      following: {
        select: {
          username: true,
          id: true,
          avatarUrl: true,
          followers: true,
        },
      },
    },
  });
  return (
    <div>
      {followings.map((following) => (
        <ProfileCard
          key={following.following.id}
          initialData={following.following}
        ></ProfileCard>
      ))}
    </div>
  );
}
