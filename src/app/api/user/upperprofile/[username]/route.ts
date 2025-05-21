import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const userdata: {} = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        name: true,
        avatarUrl: true,
        createdAt: true,
        following: true,
        followers: true,
        username: true,
      },
    });

    return NextResponse.json(userdata);
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
