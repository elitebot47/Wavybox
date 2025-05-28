import ProfileCard from "@/components/profilepage/profilecard";
import { prisma } from "@/lib/prisma";

export default async function FollowersPage({
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

  const followers = await prisma.follows.findMany({
    where: {
      followingId: userId.id,
    },
    include: {
      follower: {
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
      {followers.length == 0 && (
        <div className="flex text-4xl justify-center">
          You dont have any followers
        </div>
      )}
      {followers.map((follower) => (
        <ProfileCard
          key={follower.follower.id}
          initialData={follower.follower}
        ></ProfileCard>
      ))}
    </div>
  );
}
