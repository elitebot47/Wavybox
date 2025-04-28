import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./hash";

const client = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "eg. smith_1",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: { username: string; password: string }) {
        const username = credentials.username;
        const password = credentials.password;
        if (!username || !password) {
          console.warn("credentials missing!!");
          return null;
        }
        const userdata = await client.user.findFirst({
          where: {
            username: username,
          },
          include: {
            posts: true,
          },
        });

        if (userdata) {
          const passwordverify = await verifyPassword(
            userdata.password,
            password
          );
          if (passwordverify) {
            return userdata;
          }
        } else {
          return null;
        }
      },
    }),
  ],
});
