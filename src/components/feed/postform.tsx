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
import {
  Check,
  CircleX,
  Image,
  LanguagesIcon,
  PencilIcon,
  Plus,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { usePostModalStore } from "@/store/postStore";
import { useMobileStore } from "@/store/isMobileStore";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface imageData {
  url: string;
  public_id: string;
}

export default function Postform({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { closeModal } = usePostModalStore();
  const [posting, setPosting] = useState(false);
  const [postTextcontent, setpostTextcontent] = useState("");
  const [language, setLanguage] = useState("");
  const [ailoader, setAiloader] = useState(false);
  const [imageloader, setimageloader] = useState(false);
  const [imagesArray, setimagesArray] = useState<imageData[]>([]);
  const { ismobile } = useMobileStore();
  const postcontentRef = useRef(null);
  const [AiacceptButton, setAiacceptButton] = useState(false);
  const router = useRouter();
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
      if (files[i].size > 5 * 1024 * 1024) {
        toast.error(`File ${files[i].name} is too large. Max size is 5MB`);
        continue;
      }
      formData.append("file", files[i]);
      formData.append("upload_preset", "post-preset");
      try {
        const response = await axios.post("/api/post/media", formData);
        const { secureUrl, public_id } = response.data;
        uploadedimages.push({ url: secureUrl, public_id });
      } catch (error) {
        toast.error("Upload failed", error);
      }
    }
    setimagesArray((prev) => [...prev, ...uploadedimages]);

    setimageloader(false);
  }

  async function Aicontent(processtype: string) {
    setAiloader(true);
    const postcontent = postTextcontent.trim();
    postcontentRef.current = postcontent;
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
      setAiacceptButton(true);
      setAiloader(false);
    } catch (error) {
      toast.error("AI features not currently available");
      setAiloader(false);
    }
  }

  async function Handlepost() {
    setPosting(true);
    if (status == "unauthenticated") {
      toast.error("You are not logged in!");
      router.replace("/Sigin");
      toast.info("Login now");
      setPosting(false);
      return;
    }

    if (!postTextcontent.trim() && imagesArray.length === 0) {
      toast.error("Post cannot be empty");
      setPosting(false);
      return;
    }

    try {
      await axios.post("/api/post", {
        content: postTextcontent,
        images: imagesArray,
      });

      const keys = [["allposts"], ["user-posts", session.user.username]];
      keys.forEach((key) =>
        queryClient.invalidateQueries({
          queryKey: key,
        })
      );
      setTimeout(() => {
        toast.success("Post published successfully");
      }, 1000);
      closeModal();
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut" },
        layouty: { duration: 0.5, ease: "easeOut" },
      }}
      className={`border sm:w-screen sm:rounded-none shadow-none border-t-0  border-gray-200 lg:p-4 flex flex-col gap-3 bg-white  overflow-hidden px-2 py-2 ${
        className ?? ""
      }`}
    >
      <div>
        {ailoader && (
          <Skeleton className="w-full min-h-[50px] max-h-full"></Skeleton>
        )}
        {AiacceptButton && (
          <div className="fixed" onClick={(e) => e.stopPropagation}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 100, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute  -top-4 -left-3 z-50 flex"
            >
              <Button
                onClick={() => setAiacceptButton(false)}
                className="  text-white p-2 transition-all duration-500 bg-black/70 hover:bg-black  h-7 rounded-none rounded-l-full "
              >
                <Check className="size-7"></Check>
              </Button>
              <Separator orientation="vertical" color="black"></Separator>
              <Button
                onClick={() => {
                  setpostTextcontent(postcontentRef.current);
                  setAiacceptButton(false);
                }}
                className="text-white transition-all duration-500   h-7 rounded-none rounded-r-full hover:bg-black  bg-black/70"
              >
                <Plus className="rotate-45 size-7"></Plus>
              </Button>
            </motion.div>
          </div>
        )}
        <Textarea
          autoFocus
          maxLength={150}
          value={postTextcontent}
          disabled={ailoader || posting || AiacceptButton}
          hidden={ailoader}
          className={`${
            AiacceptButton ? "blink mt-3.5  " : ""
          } whitespace-pre-wrap rounded-2xl max-h-80 
            resize-none !text-lg textarea-class p-2  text-gray-800 placeholder:text-gray-400 w-full min-h-[50px] overflow-y-auto   outline-none border-none !border-0 !shadow-none focus:!ring-0 focus:!ring-offset-0 `}
          onChange={(e) => setpostTextcontent(e.target.value)}
          placeholder="so what's on your mood?"
        />
      </div>
      {imagesArray && (
        <div className="flex flex-wrap ">
          {imagesArray.map((image) => (
            <div
              className="relative group h-auto rounded-lg overflow-hidden m-0.5"
              key={image.public_id}
            >
              <CldImage
                src={image.url}
                alt={image.public_id}
                width={ismobile ? 70 : 120}
                height={ismobile ? 70 : 120}
                quality="auto"
                format="auto"
                loading="eager"
              ></CldImage>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-1.5 right-1.5 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity  duration-200 ">
                <button
                  className="text-black lg:text-white"
                  title="Remove"
                  onClick={async () => {
                    setimagesArray((prev) =>
                      prev.filter((img) => img.public_id != image.public_id)
                    );
                    await axios.delete(`/api/post/media/`, {
                      params: {
                        publicIdArray: [image.public_id],
                      },
                    });
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
              {imageloader ? (
                <Loader></Loader>
              ) : (
                <Image className="size-6"></Image>
              )}
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
              Aicontent(`translate to ${e}`);
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
            onClick={() => Aicontent("fix spelling grammar and typing error")}
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
          disabled={posting || AiacceptButton || ailoader || imageloader}
          className=" w-auto h-9 bg-black hover:bg-gray-800 text-lg    text-white"
        >
          {posting ? <Loader className="text-white" /> : "Post"}
        </Button>
      </div>
    </motion.div>
  );
}
