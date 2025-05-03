"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import Loader from "../ui/loader";
import { AiPostFeature } from "@/features/AI/aipostfeature";

export default function Postform({ userid }: { userid: number }) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const postinputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  async function Aicontent(processtype: string) {
    const postcontent = postinputRef.current?.value.trim();
    if (!postcontent) {
      setMessage("Post cannot be empty");
      setPosting(false);
      return;
    }
    console.log(postcontent);

    try {
      const aiResult = await AiPostFeature(postcontent, processtype);
      postinputRef.current.value = aiResult;
      console.log("aiResult");
    } catch (error) {
      setMessage("request Failed! AI features not currently available");
    }
  }
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
      <Button onClick={() => Aicontent("summarise")}>Summarise</Button>
      <Button
        onClick={() =>
          Aicontent("fix spelling and grammar errors only dont change content")
        }
      >
        Fix spelling/grammar errors
      </Button>
      <Button disabled={posting} onClick={Handlepost}>
        {posting ? <Loader /> : "Post"}
      </Button>
    </div>
  );
}
