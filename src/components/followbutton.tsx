"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import Loader from "./ui/loader";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export default function FollowButton({ username, userProfileData }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const isFollowingInitial = Boolean(
    userProfileData.followers.find((f) => f.followerId == session?.user?.id)
  );
  const [follow, setFollow] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  async function handleFollow() {
    setLoading(true);
    try {
      if (follow) {
        const res = await axios.delete(`/api/follow/${username}`);
        toast.info(res.data.message || "Unfollowed successfully");
        setFollow(false);
      } else {
        const res = await axios.post(`/api/follow/${username}`);
        toast.info(res.data.message || "Followed successfully");
        setFollow(true);
      }
      queryClient.invalidateQueries({
        queryKey: ["user-profile", username],
      });
    } catch (error) {
      toast.error(`${error?.response?.data}`);
    } finally {
      setLoading(false);
      return;
    }
  }

  return (
    <Button className="" onClick={() => handleFollow()} disabled={loading}>
      {loading ? (
        <Loader
          className=" w-auto !text-white
        "
        />
      ) : follow ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
