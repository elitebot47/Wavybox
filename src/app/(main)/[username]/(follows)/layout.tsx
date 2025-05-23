import { Follownav } from "@/components/profilepage/FollowsNavigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function FollowsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { username } = params;

  return (
    <div>
      <Button
        asChild
        className="hover:scale-110 border-0 shadow-none mx-auto hover:bg-transparent   bg-transparent text-black "
      >
        <Link
          className="flex justify-center items-center h-10"
          href={`/${username}`}
        >
          <ArrowLeftSquareIcon className=" " />
          Back to {username}
        </Link>
      </Button>
      <Follownav username={username}></Follownav>
      <main>{children}</main>
    </div>
  );
}
