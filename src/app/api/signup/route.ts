import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HashPassword } from "@/lib/hash";
import { Prisma } from "@prisma/client";
import UniqueUsernameGenerator from "@/lib/uniqueusername";

interface Creds {
  email: string;
  password: string;
}

const signupSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export async function POST(req: NextRequest) {
  try {
    const { email, password }: Creds = await req.json();
    const parsed = signupSchema.safeParse({ email, password });
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
    const finalemail = email.toLowerCase().trim();
    const AutoGenUsername = await UniqueUsernameGenerator(finalemail);
    const hashedPassword = await HashPassword(password);
    const response = await prisma.user.create({
      data: {
        email: finalemail,
        password: hashedPassword,
        username: AutoGenUsername,
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
          { message: "email already exists" },
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
