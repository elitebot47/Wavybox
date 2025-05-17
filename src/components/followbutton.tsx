"use client";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function FollowButton({ username, isFollowingInitial }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const [follow, setFollow] = useState(isFollowingInitial);

  async function handleFollow() {
    setLoading(true);
    try {
      if (follow) {
        const res = await axios.delete(`/api/follow/${username}`);
        toast.success(res.data.message || "Unfollowed successfully");
        setFollow(false);
      } else {
        const res = await axios.post(`/api/follow/${username}`);
        toast.success(res.data.message || "Followed successfully");
        setFollow(true);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Unexpected Error, try again later"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleFollow} disabled={loading}>
      {loading ? <Loader /> : follow ? "Unfollow" : "Follow"}
    </Button>
  );
}
