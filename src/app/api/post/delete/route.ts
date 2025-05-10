import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { postId } = await req.json();
  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    return NextResponse.json({
      message: " Your post was deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while deleting" },
      {
        status: 409,
      }
    );
  }
}
