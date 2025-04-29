"use client";

import { useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    signIn("credentials", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });
  }
  return (
    <div>
      <h1>Login page</h1>
      <div className="flex flex-col">
        <input ref={usernameRef} type="text" placeholder="username" />
        <input ref={passwordRef} type="text" placeholder="password" />
      </div>
      <button onClick={() => handleSubmit()}>Sign in</button>
      <div>
        new user?
        <Link href={"/signup"}>Register</Link>
      </div>
    </div>
  );
}
