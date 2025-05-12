import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
interface CloudinaryImage {
  url: string;
  public_id: string;
}

interface PostCreds {
  content: string;
  userid: number;
  images: CloudinaryImage[];
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { content, userid, images }: PostCreds = await req.json();
    console.log("now trying to create post in db");
    await prisma.post.create({
      data: {
        content,
        authorId: Number(userid),
        images: {
          create: images.map((img) => ({
            secureUrl: img.url,
            publicId: img.public_id,
          })),
        },
      },
    });
    console.log("post created in DB,wow");

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
        author: { select: { username: true, avatarUrl: true } },
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
