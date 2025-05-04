import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
interface Postcreds {
  content: string;
  userid: number;
  imageUrl: string;
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { content, userid, imageUrl }: Postcreds = await req.json();
    console.log("now trying to create post in db");
    await prisma.post.create({
      data: {
        content,
        authorId: Number(userid),
        imageUrl,
      },
    });
    console.log("post created in DB,wow");

    return NextResponse.json({
      message: "Your post was sent",
    });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json({
        message: "Your post was sent" + error.response.data,
      });
    } else if (error.request) {
      return NextResponse.json({
        message: "Your post was sent" + error.request,
      });
    } else {
      return NextResponse.json({
        message: "Your post was sent" + error.message,
      });
    }
  }
}
