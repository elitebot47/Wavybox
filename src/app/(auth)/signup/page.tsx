"use client";
import { useRef, useState } from "react";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function SignUpPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, Seterrors] = useState("");
  const router = useRouter();

  async function Sendcreds() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const result = signupSchema.safeParse({ username, password });
    if (!result.success) {
      const errors = result.error.errors
        .map((error) => error.message)
        .join(", ");
      Seterrors(errors);
      return;
    }
    try {
      const response = await axios.post("/api/signup", {
        username,
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
        <input
          className=""
          ref={usernameRef}
          type="text"
          placeholder="username"
        />
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
