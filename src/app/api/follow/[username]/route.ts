import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(
  req: NextResponse,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  const session = await auth();
  const followingUser = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (!followingUser) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }
  if (followingUser.id == session.user.id) {
    return NextResponse.json(
      {
        message: "You cant follow yourself!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.follows.create({
      data: {
        followerId: Number(session.user.id),
        followingId: Number(followingUser.id),
      },
    });
    console.log("i followed someone");

    toast.info(`You followed ${username}`);
    return NextResponse.json({ message: `You followed ${username}` });
  } catch (error) {
    return NextResponse.json({ message: "Already following" }, { status: 409 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const session = await auth();
  const { username } = params;
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const followingUser = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  try {
    await prisma.follows.deleteMany({
      where: {
        followerId: Number(session.user.id),
        followingId: Number(followingUser.id),
      },
    });
    toast.info(`You unfollowed ${followingUser}`);
    return NextResponse.json({ message: `You unfollowed ${username}` });
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error!" }, { status: 409 });
  }
}
