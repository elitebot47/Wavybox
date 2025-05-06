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
