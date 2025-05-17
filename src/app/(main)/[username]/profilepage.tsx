"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import PostArea from "@/components/feed/postarea";

export default function ProfilePage({ userPlusPosts, username }) {
  console.log(userPlusPosts);
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-b-lg" />
      <div className="flex items-end justify-between px-4 -mt-12">
        <img
          src={userPlusPosts?.avatarUrl}
          alt={userPlusPosts?.name}
          className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
        />
        {session.user.username === userPlusPosts?.username && (
          <Button variant="outline" className="mt-4">
            Edit profile
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className="px-4 mt-2">
        {/* <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          {user.isVerified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="text-blue-500"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              Get verified
            </Badge>
          )}
        </div> */}
        <div className="text-gray-500">@{username}</div>
        <div className="flex items-center gap-4 text-gray-500 mt-2">
          {/* {user.location && (
            <span>
              <svg
                className="inline w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              {user.location}
            </span>
          )} */}
          <span>
            <svg
              className="inline w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
            </svg>
            Joined{" "}
            {userPlusPosts?.createdAt
              ? format(new Date(userPlusPosts.createdAt), "MMMM yyyy")
              : ""}
          </span>
        </div>
        {/* <div className="flex gap-4 mt-2">
          <span>
            <b>{user.following}</b> Following
          </span>
          <span>
            <b>{user.followers}</b> Followers
          </span>
        </div>
        {user.bio && <div className="mt-2">{user.bio}</div>} */}
      </div>

      {/* Tabs */}
      <div className="flex border-b mt-6 px-4 overflow-auto">
        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(
          (tab) => (
            <button
              key={tab}
              className="py-2 px-2 text-gray-600 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 font-medium"
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div>
        <PostArea
          userid={session.user.id}
          initialposts={userPlusPosts.posts}
          username={username}
          queryKey={["user-posts", username]}
          queryParams={{ username }}
        />
      </div>
    </div>
  );
}
