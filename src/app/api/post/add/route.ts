import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function Post(req: NextRequest) {
    const Content=req.content
    await prisma.post.create({
        data:{
            content:
        }
    })
  return NextResponse.json({
    message: "Your post was sent",
  });
}
