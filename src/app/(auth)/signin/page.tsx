"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signinSchema = z.object({
  email: z
    .string()
    .min(1, "email cant be empty")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(6, "password short!! ,should be atleast 6 character "),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const parsed = signinSchema.safeParse({ email, password });
      if (!parsed.success) {
        const errors = parsed.error.errors
          .map((error) => error.message)
          .join(", ");
        toast.error(errors);
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
          toast.error("Invalid email or password.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (res?.ok) {
        toast.success("Login successful! Redirecting to the homepage...");
        // window.location.href = "/home";
        router.push("/home");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                disabled={loading}
                value={email}
                id="email"
                type="text"
                placeholder="eg. manish.y@gmail.com"
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                disabled={loading}
                value={password}
                id="password"
                type="password"
                placeholder="eg. 3#$fAad"
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader className="text-white" /> : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-4">
          <div className="text-center text-sm">
            New user?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
