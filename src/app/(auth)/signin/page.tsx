"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { z } from "zod";

const signinSchema = z.object({
  username: z.string().min(1, "Username cant be empty"),
  password: z
    .string()
    .min(6, "password short!! ,should be atleast 6 character "),
});
export default function () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const parsed = signinSchema.safeParse({ username, password });
      if (parsed.success) {
        setLoading(true);
        const res = await signIn("credentials", {
          redirect: false,
          username,
          password,
        });
        if (res && res.ok) {
          window.location.href = "/home";
        } else {
          setError("invalid password or username");
        }
      } else {
        const errors = parsed.error.errors
          .map((error) => error.message)
          .join(", ");
        setError(errors);
      }
    } catch (error) {
      setError("credentials incorrect");
    }
  }
  return (
    <div>
      <h1>Login page</h1>
      {error && <div className="text-red-600">{error}</div>}

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
