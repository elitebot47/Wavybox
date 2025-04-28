import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        name: {
          label: "name",
          placeholder: "john",
          type: "text",
        },
        email: {
          label: "username",
          type: "text",
          placeholder: "eg. smith_1",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials.email;
        const password = credentials.password;
        const user = {
          username,
          id: 1,
          email: "1@gmail.com",
        };
        if (user) {
          return user;
        } else return null;
      },
    }),
  ],
});
