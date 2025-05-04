"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Loader from "../ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Postform({ userid }: { userid: number }) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const postinputRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("");
  const [ailoader, setAiloader] = useState(false);

  async function Aicontent(processtype: string) {
    setAiloader(true);
    const postcontent = postinputRef.current?.value.trim();
    if (!postcontent) {
      setMessage("Post cannot be empty");
      setAiloader(false);
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
    <div className=" border-2 border-black  p-2 flex flex-col ">
      {/* <div className="fixed top-0 right-1">{message}</div> */}
      <div>
        <Textarea
          className="border-hidden focus:border-hidden hover:border-hidden"
          ref={postinputRef}
          placeholder="so whats on your mood?"
        />
      </div>
      <div className="flex w-full h-full ">
        <div className="flex   m-auto ">
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
              Aicontent(`translate this to ${value}`);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Translate to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Russian">Russian</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() =>
              Aicontent("fix spelling and grammar errors only and dont change ")
            }
            variant="outline"
          >
            {ailoader ? <Loader /> : "Fix spelling/grammar errors"}
          </Button>
        </div>
        <Button className="h-9 m-auto" disabled={posting} onClick={Handlepost}>
          {posting ? <Loader /> : "Post"}
        </Button>
      </div>
    </div>
  );
}
