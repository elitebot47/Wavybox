"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Content } from "next/font/google";
import Loader from "../ui/loader";

export default function Postform({ userid }) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const postinputRef = useRef(null);
  async function Handlepost() {
    setPosting(true);
    const postcontent = postinputRef.current?.value;
    const response = await axios.post("api/post/add", {
      content: postcontent,
      userid: userId,
    });
    setPosting(false);
  }
  return (
    <div>
      <input
        ref={postinputRef}
        type="text"
        placeholder="so whats on your mood?"
      />
      <Button className="" disabled={posting} onClick={Handlepost}>
        {posting && <Loader />}
        Post
      </Button>
    </div>
  );
}
