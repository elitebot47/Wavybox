// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      username: string;
      name: string;
      avatarUrl: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    name: string;
    avatarUrl: string;
    id: number;
    email: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    avatarUrl: string;
    id: number;
    email: string;
    username: string;
  }
}
