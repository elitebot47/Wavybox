"use client";
import { useState } from "react";
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
import { CircleX, Image, LanguagesIcon, PencilIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Span } from "next/dist/trace";

interface imageData {
  url: string;
  public_id: string;
}

export default function Postform({
  userid,
  className,
}: {
  userid: number;
  className?: string;
}) {
  const [posting, setPosting] = useState(false);
  const userId = userid;
  const [postTextcontent, setpostTextcontent] = useState("");
  const [language, setLanguage] = useState("");
  const [ailoader, setAiloader] = useState(false);
  const [imageloader, setimageloader] = useState(false);
  const [imagesArray, setimagesArray] = useState<imageData[]>([]);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files: any = event.target.files;
    if (!files || files.length === 0) return;
    if (((!files || files.length) | imagesArray.length) >= 5) {
      toast.error("Max upload allowed:4");
      return;
    }

    const uploadedimages: Array<imageData> = [];
    setimageloader(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", "post-preset");
      try {
        const response = await axios.post("/api/post/media", formData);
        const { secureUrl, public_id } = response.data;
        uploadedimages.push({ url: secureUrl, public_id });
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
    setimagesArray((prev) => [...prev, ...uploadedimages]);

    setimageloader(false);
  }

  async function Aicontent(processtype: string) {
    setAiloader(true);
    const postcontent = postTextcontent.trim();
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
      setpostTextcontent(aiResult.data.message);
      setAiloader(false);
    } catch (error) {
      toast.error("AI features not currently available");
      setAiloader(false);
    }
  }

  async function Handlepost() {
    setPosting(true);

    if (!postTextcontent.trim() && imagesArray.length === 0) {
      toast.error("Post cannot be empty");
      setPosting(false);
      return;
    }

    try {
      await axios.post("/api/post", {
        content: postTextcontent,
        userid: userId,
        images: imagesArray,
      });
      toast.success("Post published successfully");
      setpostTextcontent("");
      setimagesArray([]);
      setPosting(false);
    } catch (error) {
      toast.error("Failed to post. Please try again.");
      setPosting(false);
    }
  }

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
      className={`border   shadow-none border-t-0 border-gray-200 p-4 flex flex-col gap-3 bg-white  overflow-hidden ${
        className ?? ""
      }`}
    >
      <div>
        {ailoader && (
          <Skeleton className="w-full min-h-[50px] max-h-full"></Skeleton>
        )}

        <Textarea
          maxLength={150}
          value={postTextcontent}
          disabled={ailoader || posting}
          hidden={ailoader}
          className=" whitespace-pre-wrap   resize-none !text-lg textarea-class p-2 text-gray-800 placeholder:text-gray-400 w-full min-h-[50px] outline-none border-none !border-0 !shadow-none focus:!ring-0 focus:!ring-offset-0 rounded-none"
          onChange={(e) => setpostTextcontent(e.target.value)}
          placeholder="so what's on your mood?"
        />
      </div>
      {imagesArray && (
        <div className="flex flex-wrap ">
          {imagesArray.map((image) => (
            <div
              className="relative group rounded-lg overflow-hidden"
              key={image.public_id}
            >
              <CldImage
                src={image.url}
                alt={image.public_id}
                width={200}
                height={200}
                loading="eager"
              ></CldImage>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity  duration-200">
                <button
                  className="text-white"
                  title="Remove"
                  onClick={async () => {
                    setimagesArray((prev) =>
                      prev.filter((img) => img.public_id != image.public_id)
                    );
                    await axios.delete(
                      `/api/post/media?publicId=${image.public_id}`
                    );
                  }}
                >
                  <CircleX size={29}></CircleX>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            asChild
            size="icon"
            className="text-black hover:bg-gray-200 bg-white border-2  border-gray-200"
            disabled={imageloader || posting}
          >
            <Label htmlFor="file-upload" className="cursor-pointer">
              {imageloader ? <Loader></Loader> : <Image></Image>}
              <Input
                disabled={imageloader}
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleUpload}
              />
            </Label>
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
              <SelectValue
                placeholder={
                  <div>
                    <span className=" sm:block hidden">Translate</span>
                    <LanguagesIcon className=" block sm:hidden"></LanguagesIcon>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Hinglish">Hinglish</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Russian">Russian</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>

          <Button
            disabled={ailoader || posting}
            onClick={() =>
              Aicontent(
                "fix spelling , grammar  errors  ,dont give any post explantion after giving result ,Adjust my text to follow correct capitalization rules."
              )
            }
            variant="outline"
            className="h-9 border-gray-200 w-auto"
          >
            <span className=" hidden sm:block">Improve Writing</span>
            <PencilIcon className="block sm:hidden"></PencilIcon>
          </Button>
        </div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: "black",
            trailColor: "#e5e7eb",
          })}
          strokeWidth={20}
          className="text-black w-5 h-5"
          value={postTextcontent.length}
          maxValue={150}
          minValue={0}
        />

        <Button
          onClick={Handlepost}
          disabled={posting || ailoader || imageloader}
          className=" w-auto h-9 bg-black hover:bg-gray-800 text-lg    text-white"
        >
          {posting ? <Loader className="text-white" /> : "Post"}
        </Button>
      </div>
    </motion.div>
  );
}
