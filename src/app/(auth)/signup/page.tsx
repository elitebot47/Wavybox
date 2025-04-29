"use client";
import { useRef, useState } from "react";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";

const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, Seterrors] = useState("");
  const [messages, setMessages] = useState([]);

  async function Sendcreds() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const result = signupSchema.safeParse({ username, password });
    if (!result.success) {
      const firsterror = result.error.errors[0]?.message || "invalid input";
      Seterrors(firsterror);
    }
    const response = await axios.post("/api/signup", {
      username,
      password,
    });
    setMessages(response.data);
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
