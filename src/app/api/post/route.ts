import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
interface CloudinaryImage {
  secureUrl: string;
  publicId: string;
}

interface PostCreds {
  content: string;
  userid: number;
  images: CloudinaryImage[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    const { content, images }: PostCreds = await req.json();
    await prisma.post.create({
      data: {
        content,
        authorId: Number(session.user.id),
        images: {
          create: images.map((img) => ({
            secureUrl: img.secureUrl,
            publicId: img.publicId,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Your post was sent",
    });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json({
        message: "error:" + error.response.data,
      });
    } else if (error.request) {
      return NextResponse.json({
        message: "error:" + error.request,
      });
    } else {
      return NextResponse.json({
        message: "error:" + error.message,
      });
    }
  }
}
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { username: true, name: true, avatarUrl: true } },
        images: { select: { secureUrl: true, publicId: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { message: "error while fetching posts!" },
      { status: 40 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const { postId } = await req.json();

  try {
    const deletedStatus = await prisma.post.deleteMany({
      where: { id: postId, authorId: Number(session.user.id) },
    });
    if (deletedStatus.count === 0) {
      return NextResponse.json(
        { error: "Not authorized or post not found" },
        { status: 409 }
      );
    }

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
