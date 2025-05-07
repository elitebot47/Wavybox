import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const unprotectedPath = ["/landpage", "/signin", "/signout"];
  const url = req.nextUrl.pathname;

  if (unprotectedPath.includes(url)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/home"],
};
