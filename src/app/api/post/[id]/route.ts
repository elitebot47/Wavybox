import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const post = await prisma.post.findUnique({
      include: {
        author: { select: { username: true, id: true, avatarUrl: true } },
        images: { select: { secureUrl: true, publicId: true } },
      },
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { message: "error while fetching post!" },
      { status: 409 }
    );
  }
}
