"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function SignInButton() {
  return <Link href={"/signin"}>Sign in</Link>;
}
export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/signin" })}>signout</button>
  );
}
