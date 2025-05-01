import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./hash";
import { prisma } from "../lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "username and password",
      credentials: {
        username: {
          label: " email or username",
          type: "text",
          placeholder: "eg. smith_1",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: { username: string; password: string }) {
        const username = credentials.username;
        const password = credentials.password;

        if (!username || !password) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: username,
            },
          });
          const passwordverify = await verifyPassword(user.password, password);
          if (user && passwordverify) {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
