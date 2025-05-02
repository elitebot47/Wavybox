"use client";
import { useRef, useState } from "react";
import { string, z } from "zod";
import axios from "axios";
import Link from "next/link";

const signupSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function SignUpPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, Seterrors] = useState("");

  async function Sendcreds() {
    const email = emailRef.current?.value.toLowerCase() || "";
    const password = passwordRef.current?.value || "";
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.errors
        .map((error) => error.message)
        .join(", ");
      Seterrors(errors);
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        email,
        password,
      });
      Seterrors(response.data.message);
    } catch (error: any) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        Seterrors(
          error.response.data.message || "An error occurred during signup."
        );
      } else {
        console.error("Network or other error:", error);
        Seterrors("Network error or server is down.");
      }
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <div className="text-red-600">{error}</div>

      <div className="flex flex-col">
        <input className="" ref={emailRef} type="text" placeholder="email" />
        <input ref={passwordRef} type="text" placeholder="password" />
      </div>
      <button onClick={() => Sendcreds()}>Signup</button>

      <div className="flex ">
        <div>want to sign in?</div>
        <Link href={"/signin"}>sign in</Link>
      </div>
    </div>
  );
}
