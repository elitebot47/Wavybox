import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HashPassword } from "@/lib/hash";
import { Prisma } from "@prisma/client";

const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const parsed = signupSchema.safeParse({ username, password });
    if (!parsed.success) {
      const errors = parsed.error.errors
        .map((error) => error.message)
        .join(", ");
      return NextResponse.json(
        {
          message: errors,
        },
        { status: 409 }
      );
    }

    const hashedPassword = await HashPassword(password);
    const response = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: `registration succesfull` },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Username already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      {
        message: "error while registration",
      },
      { status: 500 }
    );
  }
}
