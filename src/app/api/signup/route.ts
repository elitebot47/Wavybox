import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { HashPassword } from "@/lib/hash";
import { Prisma } from "@prisma/client";
import UniqueUsernameGenerator from "@/lib/uniqueusername";
import { generateRandomAvatarUrl } from "@/lib/avatar";

interface Creds {
  email: string;
  password: string;
  name: string;
}

const signupSchema = z.object({
  email: z
    .string()
    .min(5, "Email is too short")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(3, "Name is too short,Enter you full name")
    .max(30, "Name cannot exceed 30 characters")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabetical characters"),
});
export async function POST(req: NextRequest) {
  try {
    const { email, password, name }: Creds = await req.json();
    const parsed = signupSchema.safeParse({ email, password, name });
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
    const username = await UniqueUsernameGenerator(finalemail);
    const hashedPassword = await HashPassword(password);
    const avatarUrl = generateRandomAvatarUrl();
    await prisma.user.create({
      data: {
        email: finalemail,
        password: hashedPassword,
        username,
        avatarUrl,
        name,
      },
    });
    return NextResponse.json(
      { message: `Registration succesfull ✅ ` },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      {
        message: "Error while registration",
      },
      { status: 500 }
    );
  }
}
