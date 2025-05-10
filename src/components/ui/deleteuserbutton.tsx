"use client";
import axios from "axios";
import { Button } from "./button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "./loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Deleteuserbut() {
  const { data: session } = useSession();
  const router = useRouter();
  const [deleteLoader, setLoader] = useState(false);
  async function handleUserDelete() {
    setLoader(true);
    try {
      await axios.post("/api/user/delete", {
        userid: session?.user.id,
      });
      setLoader(false);
      router.push("/signup");
    } catch (error) {
      toast.error("Server error , try again later");
      setLoader(false);
    }
  }
  return (
    <Button onClick={handleUserDelete}>
      {deleteLoader ? (
        <Loader
          className="text-whtie
      "
        />
      ) : (
        "Delete user"
      )}
    </Button>
  );
}
