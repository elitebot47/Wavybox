"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export function Follownav({ username }) {
  const pathname = usePathname();
  return (
    <div className="flex h-14 border-2">
      <Button
        asChild
        className={` ${
          pathname == `/${username}/followers` && "underline underline-offset-2"
        } hover:underline-offset-2 hover:underline hover:bg-transparent bg-white text-black border-gray-800 rounded-none  text-lg h-full flex-1/2`}
      >
        <Link href={`/${username}/followers`}>followers</Link>
      </Button>
      <Separator orientation="vertical"></Separator>
      <Button
        className={`${
          pathname == `/${username}/following` && "underline underline-offset-2"
        } flex-1/2 h-full hover:underline-offset-2 hover:underline hover:bg-transparent  bg-white text-black rounded-none text-lg`}
        asChild
      >
        <Link className="" href={`/${username}/following`}>
          following
        </Link>
      </Button>
    </div>
  );
}
