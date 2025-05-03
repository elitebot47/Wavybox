"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import Loader from "../ui/loader";

export default function Postform({ userid }: { userid: number }) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const postinputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  async function Handlepost() {
    setPosting(true);
    const postcontent = postinputRef.current?.value.trim();
    if (!postcontent) {
      setMessage("Post cannot be empty");
      setPosting(false);
      return;
    }
    try {
      const response = await axios.post("/api/post/add", {
        content: postcontent,
        userid: userId,
      });
      setMessage(response.data.message);
      postinputRef.current.value = "";
      setPosting(false);
    } catch (error) {
      setMessage("Failed to post. Please try again.");
    }
  }
  return (
    <div>
      <div>{message}</div>
      <input
        ref={postinputRef}
        type="text"
        placeholder="so whats on your mood?"
      />
      <Button className="" disabled={posting} onClick={Handlepost}>
        {posting ? <Loader /> : "Post"}
      </Button>
    </div>
  );
}
