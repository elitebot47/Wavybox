"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import Loader from "./loader";
import { useState } from "react";
import { toast } from "sonner";

export function SignInButton() {
  return <Link href={"/signin"}>Sign in</Link>;
}

export function SignOutButton({ className }: { className?: string }) {
  const [loaderstate, setLoaderstate] = useState(false);

  return (
    <button
      className={`${className}   `}
      onClick={() => {
        signOut({ callbackUrl: "/signin" });
        toast.error("Logging out..");
      }}
    >
      {loaderstate ? <Loader className="text-white" /> : "Signout"}
    </button>
  );
}
