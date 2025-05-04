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
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Postform({ userid }: { userid: number }) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const postinputRef = useRef<HTMLTextAreaElement>(null);
  const [language, setLanguage] = useState("");
  const [ailoader, setAiloader] = useState(false);

  async function Aicontent(processtype: string) {
    setAiloader(true);
    const postcontent = postinputRef.current?.value.trim();
    if (!postcontent) {
      toast.error("Post cannot be empty");
      setAiloader(false);
      return;
    }

    try {
      const aiResult = await axios.post("/api/ai/post", {
        postcontent,
        processtype,
      });
      postinputRef.current.value = aiResult.data.message;
      setAiloader(false);
    } catch (error) {
      toast.error("AI features not currently available");
      setAiloader(false);
    }
  }

  async function Handlepost() {
    setPosting(true);
    const postcontent = postinputRef.current?.value;
    if (!postcontent) {
      toast.error("Post cannot be empty");
      setPosting(false);
      return;
    }

    try {
      const response = await axios.post("/api/post/add", {
        content: postcontent,
        userid: userId,
      });
      toast.success("Post published successfully");
      postinputRef.current.value = "";
      setPosting(false);
    } catch (error) {
      toast.error("Failed to post. Please try again.");
      setPosting(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex  flex-col gap-3  bg-white shadow-sm">
      <div>
        {ailoader && (
          <Skeleton className="w-full min-h-[50px] max-h-full"></Skeleton>
        )}
        <Textarea
          disabled={ailoader || posting}
          hidden={ailoader}
          className="   font-medium resize-none textarea-class p-2 text-gray-800 placeholder:text-gray-400 w-full min-h-[50px] outline-none border-none !border-0 !shadow-none focus:!ring-0 focus:!ring-offset-0 rounded-none"
          ref={postinputRef}
          placeholder="so what's on your mood?"
        />
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button disabled={ailoader || posting} className=" ">
            <Image size={18}></Image>
          </Button>
          <Select
            disabled={ailoader || posting}
            value={language}
            onValueChange={(e) => {
              setLanguage(e);
              Aicontent(
                `language translate this to ${e} and dont give any explanation`
              );
            }}
          >
            <SelectTrigger className="w-auto h-9 bg-white  border-gray-200">
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
            disabled={ailoader || posting}
            onClick={() =>
              Aicontent(
                "fix spelling , grammar  errors  only and dont change and dont give any explanation,Adjust my text to follow correct capitalization rules."
              )
            }
            variant="outline"
            className="h-9 border-gray-200 w-auto"
          >
            Fix spelling/grammar errors
          </Button>
        </div>

        <Button
          onClick={Handlepost}
          disabled={posting || ailoader}
          className=" w-auto h-9 bg-black hover:bg-gray-800 text-white"
        >
          {posting ? <Loader /> : "Post"}
        </Button>
      </div>
    </div>
  );
}
