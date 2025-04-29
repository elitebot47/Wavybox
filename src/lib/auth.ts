import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./hash";
import { prisma } from "../lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
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
          const userverify = await prisma.user.findUnique({
            where: {
              username: username,
            },
          });
          if (userverify) {
            const passwordverify = await verifyPassword(
              userverify.password,
              password
            );
            if (passwordverify) {
              const userdata = await prisma.user.findFirst({
                where: {
                  username: username,
                },
                include: {
                  posts: true,
                },
              });
              console.log("user login succesfull");
              return userdata;
            }
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
