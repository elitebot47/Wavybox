import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userid } = await req.json();
  try {
    await prisma.user.delete({
      where: {
        id: Number(userid),
      },
    });
    return NextResponse.json({ message: "Succesfully deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while deleting user" + error },
      { status: 409 }
    );
  }
}
