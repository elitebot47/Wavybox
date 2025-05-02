"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().min(1, "email cant be empty"),
  password: z
    .string()
    .min(6, "password short!! ,should be atleast 6 character "),
});
export default function () {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const parsed = signinSchema.safeParse({ email, password });
      if (!parsed.success) {
        const errors = parsed.error.errors
          .map((error) => error.message)
          .join(", ");
        setError(errors);
        return;
      }

      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("Invalid email or password.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (res?.ok) {
        window.location.href = "/home";
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred during sign in. Please try again.");
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col">
      <div className="">
        <h1 className="">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col">
            <input ref={emailRef} type="text" placeholder="email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <Loader /> : "Sign in"}
          </button>
        </form>
        <div className="">
          New user?{" "}
          <Link href="/signup" className="text-blue-500 ">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
