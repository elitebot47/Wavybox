"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return <button onClick={() => signIn()}>sigin</button>;
}
export function SignOutButton() {
  return <button onClick={() => signOut()}>signout</button>;
}
