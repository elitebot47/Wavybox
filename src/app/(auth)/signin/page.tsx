"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { error } from "console";

export default function () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit() {
    try {
      setLoading(true);
      signIn("credentials", {
        callbackUrl: "/home",
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
    } catch (error) {
      setError("credentials incorect");
    }
  }
  return (
    <div>
      <h1>Login page</h1>
      {error && <div>{error}</div>}

      <div className="flex flex-col">
        <input ref={usernameRef} type="text" placeholder="username" />
        <input ref={passwordRef} type="text" placeholder="password" />
      </div>
      <button
        disabled={loading}
        onClick={() => {
          handleSubmit();
        }}
      >
        {loading ? <Loader></Loader> : "Sign in"}
      </button>
      <div>
        new user?
        <Link href={"/signup"}>Register</Link>
      </div>
    </div>
  );
}
