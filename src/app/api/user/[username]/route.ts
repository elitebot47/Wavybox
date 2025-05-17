import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    const userPlusPosts = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        name: true,
        username: true,
        avatarUrl: true,
        createdAt: true,
        posts: {
          orderBy: { createdAt: "desc" },
          select: {
            author: { select: { username: true, avatarUrl: true } },
            id: true,
            content: true,
            createdAt: true,
            images: true,
          },
        },
      },
    });
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
