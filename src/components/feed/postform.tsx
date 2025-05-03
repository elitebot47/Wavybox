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
  const [language, setLanguage] = useState("");
  const [ailoader, setAiloader] = useState(false);

  async function Aicontent(processtype: string) {
    setAiloader(true);
    const postcontent = postinputRef.current?.value.trim();
    if (!postcontent) {
      setMessage("Post cannot be empty");
      setPosting(false);
      return;
    }
    console.log(postcontent);

    try {
      const aiResult = await axios.post("api/ai/post", {
        postcontent,
        processtype,
      });
      postinputRef.current.value = aiResult.data.message;
      setAiloader(false);
    } catch (error) {
      setMessage("request Failed! AI features not currently available");
      setAiloader(false);
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

      <Button onClick={() => Aicontent(`translate this to${language}`)}>
        {ailoader ? <Loader /> : "Translate to"}

        <select
          className="text-black"
          onChange={(e) => setLanguage(e.target.value)}
          name="languages"
          id="languageselect"
        >
          <option value="English">English</option>
          <option value="Russian">Russian</option>
          <option value="Chinese">Chinese</option>
        </select>
      </Button>
      <Button onClick={() => Aicontent("summarise")}>
        {ailoader ? <Loader /> : "Summarise"}
      </Button>
      <Button
        onClick={() =>
          Aicontent("fix spelling and grammar errors only and dont change ")
        }
      >
        {" "}
        {ailoader ? <Loader /> : "Fix spelling/grammar errors"}
      </Button>
      <Button disabled={posting} onClick={Handlepost}>
        {posting ? <Loader /> : "Post"}
      </Button>
    </div>
  );
}
