import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const session = await auth();
  const { username } = params;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
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
        following: true,
        followers: true,
      },
    });
    if (!userPlusPosts) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userPlusPosts });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching from Db:",
        error,
      },
      { status: 500 }
    );
  }
}
