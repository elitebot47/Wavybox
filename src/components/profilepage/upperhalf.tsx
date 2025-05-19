"use client";
import { useSession } from "next-auth/react";
import FollowButton from "../followbutton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar } from "lucide-react";
export default function UpperProfile({ initialData }) {
  console.log(initialData);

  const { data: session } = useSession();

  const { data = [] } = useQuery({
    queryKey: ["user-profile", initialData.username],
    queryFn: async () => {
      const username = initialData.username;
      const userdata = await axios.get(`/api/user/upperprofile/${username}`);
      return userdata.data;
    },
    initialData,
  });
  return (
    <div>
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-b-lg" />
      <div className="flex items-end justify-between px-4 -mt-12">
        <img
          src={data?.avatarUrl}
          alt={data?.name}
          className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
        />
        {session.user.username === data?.username ? (
          <Button variant="outline" className="mt-4">
            Edit profile
          </Button>
        ) : (
          <FollowButton
            username={data.username}
            userProfileData={data}
          ></FollowButton>
        )}
      </div>

      <div className="px-4 mt-2">
        <div className="text-gray-500">@{data.username}</div>
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <div>
            <Calendar className="size-5"></Calendar>
          </div>
          <div>Joined</div>
          <div>
            {data?.createdAt
              ? format(new Date(data.createdAt), "MMMM yyyy")
              : ""}
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <span>
            <b>{data.following.length}</b> Following
          </span>
          <span>
            <b>{data.followers.length}</b> Followers
          </span>
        </div>
      </div>
    </div>
  );
}
