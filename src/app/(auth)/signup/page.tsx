"use client";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
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
  const [Signuploader, setSignuploader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Sendcreds() {
    setSignuploader(true);
    const formattedEmail = email.toLowerCase().trim();
    setEmail(formattedEmail);
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.errors
        .map((error) => error.message)
        .join(", ");
      toast.error(errors);
      setSignuploader(false);
      return;
    }
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
      });
      toast.message(response.data.message);
      setSignuploader(false);
    } catch (error: any) {
      setSignuploader(false);
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Network error or server is down.");
      }
    }
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex flex-col gap-7 w-1/2 bg-black text-white p-10">
        <h1 className="text-5xl font-bold">Wavybox</h1>
        <h2 className="text-xl font-mono flex  ">
          <div className="ml-2">Where Every Voice Has Space</div>
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <Card className="w-full max-w-md shadow-md bg-white rounded-lg p-6">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-3">
              <Input
                disabled={Signuploader}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
                className="w-full border p-2 rounded-md"
              />
              <Input
                disabled={Signuploader}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded-md"
              />
            </div>

            <Button
              disabled={Signuploader}
              onClick={Sendcreds}
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              {Signuploader ? (
                <Loader className="text-white"></Loader>
              ) : (
                "Signup"
              )}
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
