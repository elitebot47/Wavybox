"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FollowButton from "../followbutton";

export default function ProfileCard({ initialData }) {
  console.log(initialData);
  const { data: session } = useSession();

  return (
    <div
      className=" gap-2.5 flex border-2 px-4 p-2 justify-items-center 
    items-center"
    >
      <div className=" ">
        <Avatar className="w-15 h-15 rounded-full border-4 border-white dark:border-gray-900  p-0.5">
          <AvatarImage loading="lazy" src={`${initialData.avatarUrl}`} />
          <AvatarFallback>{initialData.username}</AvatarFallback>
        </Avatar>
      </div>
      <Link className="text-black text-2xl" href={`/${initialData.username}`}>
        @{initialData.username}
      </Link>
      <div className="ml-auto">
        {session.user.username != initialData.username && (
          <FollowButton
            username={initialData.username}
            userProfileData={initialData}
          ></FollowButton>
        )}
      </div>
    </div>
  );
}
