"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";

export function SignInButton() {
  return <Link href={"/signin"}>Sign in</Link>;
}

export function SignOutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/signin" })}>Signout</Button>
  );
}
