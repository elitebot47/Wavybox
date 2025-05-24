"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Loader from "./loader";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";

export function SignInButton() {
  return <Link href={"/signin"}>Sign in</Link>;
}

export function SignOutButton({ className }: { className?: string }) {
  const [loaderstate, setLoaderstate] = useState(false);

  return (
    <Button
      className={`${className}   `}
      onClick={() => {
        setLoaderstate(true);
        signOut({ callbackUrl: "/signin" });
        toast.info("Logging out..");
      }}
    >
      {loaderstate ? <Loader className="text-black" /> : "Signout"}
    </Button>
  );
}
