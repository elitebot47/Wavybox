import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from '@/lib/prisma'
const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!signupSchema.safeParse({ username, password }).success) {
    return NextResponse.json({
      error: "username cant be empty/Password must be at least 6 characters",
    });
  }
  const anyMatch=await prisma.user.findMany({
    
  })
}
