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
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
const signupSchema = z.object({
  email: z
    .string()
    .min(5, "Email is too short")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(3, "Name is too short,Enter you full name")
    .max(30, "Name cannot exceed 30 characters")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabetical characters"),
});
export default function SignUpPage() {
  const [showleftinfo, setShowleftinfo] = useState(true);
  const [Signuploader, setSignuploader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function Sendcreds() {
    setSignuploader(true);
    const formattedEmail = email.toLowerCase().trim();
    setEmail(formattedEmail);
    const result = signupSchema.safeParse({ email, password, name });
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
        name,
      });
      toast.message(response.data.message + " Login now");
      setShowleftinfo(false);
      setTimeout(() => {
        setSignuploader(false);
        router.push("/signin");
      }, 1000);
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
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <AnimatePresence>
        {showleftinfo && (
          <motion.div
            initial={{ x: -900 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            exit={{ x: -900 }}
            className="hidden md:flex flex-col gap-7 w-1/2 bg-black text-white p-10"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              transition={{ duration: 1 }}
              className="text-5xl font-bold"
            >
              Wavybox
            </motion.h1>
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ duration: 2 }}
              className="text-xl font-mono flex  "
            >
              <div className="ml-2">Where Every Voice Has Space</div>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showleftinfo && (
          <motion.div
            className="flex  flex-col   justify-center items-center w-full md:w-1/2 p-6"
            initial={{ opacity: 0, y: -700 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0, x: 700 }}
          >
            <Card className="w-full max-w-md shadow-2xl  bg-white rounded-2xl  p-6">
              <CardHeader className="text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-3">
                  <Input
                    autoFocus
                    disabled={Signuploader}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Name"
                    className=" w-full border focus:!ring-black focus:!ring-1  p-2 rounded-md"
                  />
                  <Input
                    disabled={Signuploader}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                    className=" w-full border focus:!ring-black focus:!ring-1  p-2 rounded-md"
                  />
                  <Input
                    disabled={Signuploader}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border focus:!ring-black focus:!ring-1 p-2 rounded-md"
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
                  <Link
                    href="/signin"
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
