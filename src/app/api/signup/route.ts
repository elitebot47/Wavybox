import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HashPassword } from "@/lib/hash";

const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!signupSchema.safeParse({ username, password }).success) {
    return NextResponse.json(
      {
        error: "username cant be empty/Password must be at least 6 characters",
      },
      { status: 409 }
    );
  }
  console.log("finding matches..");

  const anyMatch = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (anyMatch) {
    return NextResponse.json({ error: "user already exists" }, { status: 409 });
  }
  console.log("no match found,now mving to hashing");
  const hashedPassword = await HashPassword(password);
  console.log("password hashed succesfully");
  const response = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  console.log("user create request sent");
  return NextResponse.json({ message: response.id }, { status: 201 });
}
