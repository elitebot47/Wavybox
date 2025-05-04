"use client";
import { useRef, useState } from "react";
import { string, z } from "zod";
import axios from "axios";
import Link from "next/link";
import { signUp } from "next-auth/react"; // Hypothetical signup function (adjust based on backend)
import Loader from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
const signupSchema = z.object({
  email: z
    .string()
    .min(5, "Email is too short")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function SignUpPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function Sendcreds() {
    const email = emailRef.current?.value.toLowerCase() || "";
    const password = passwordRef.current?.value || "";
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.errors
        .map((error) => error.message)
        .join(", ");
      toast.error(errors);
      return;
    }
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
      });
      toast.message(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Network error or server is down.");
      }
    }
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section - Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-black text-white p-10">
        <h1 className="text-3xl font-bold">Wavybox</h1>
        <p className="text-sm">
          "This platform has saved me countless hours of work and helped me
          deliver stunning designs faster!" — Rishab Yadav
        </p>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md shadow-md bg-white rounded-lg p-6">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-3">
              <Input
                ref={emailRef}
                type="text"
                placeholder="Email"
                className="w-full border p-2 rounded-md"
              />
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded-md"
              />
            </div>

            <Button
              onClick={Sendcreds}
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Signup
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
