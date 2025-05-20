"use client";

import { formatDistanceToNowStrict } from "date-fns";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { UserPost } from "@/types";
import Imagespace from "./imagespace";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletePost from "@/lib/deletepost";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import Loader from "../ui/loader";

function getShortRelativeTime(date: Date | string) {
  const full = formatDistanceToNowStrict(new Date(date), { addSuffix: true });

  return full
    .replace(" hours", " h")
    .replace(" hour", " h")
    .replace(" minutes", " m")
    .replace(" minute", " m")
    .replace(" seconds", " s")
    .replace(" second", " s")
    .replace(" days", " d")
    .replace(" day", " d")
    .replace(" months", " mo")
    .replace(" month", " mo")
    .replace(" years", " y")
    .replace(" year", " y");
}

export default function Post({
  username,
  content,
  name,
  createdAt,
  images,
  tags,
  id,
  avatarUrl,
}: UserPost & { tags?: string[] }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const publicIdArray = [];
  const timeago = getShortRelativeTime(createdAt);
  const { data: session } = useSession();
  const [DeletingStatus, setDeletingStatus] = useState(false);
  images.forEach((image) => publicIdArray.push(image.publicId));
  const pathname = usePathname();

  const { mutate: deletePost } = useMutation({
    mutationFn: DeletePost,
    onSuccess: () => {
      const keys = [["allposts"], ["user-posts", username]];
      keys.forEach((key) =>
        queryClient.invalidateQueries({
          queryKey: key,
        })
      );

      setTimeout(() => {
        toast.warning("Your post is deleted");
      }, 700);
    },
  });
  const handleUsernameClick = (e) => {
    e.stopPropagation();
  };

  const handlePostClick = () => {
    router.push(`/${username}/post/${id}`);
  };

  return (
    <div className={`${DeletingStatus && "opacity-50"}`}>
      <Card
        className="w-full max-w-2xl border-x-0 pb-1 pt-2 mx-auto gap-0 rounded-none cursor-pointer"
        onClick={handlePostClick}
      >
        <CardHeader className="flex flex-row px-2  items-start">
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/${username}`);
            }}
            className="cursor-pointer "
          >
            <Avatar className="transition-all duration-500 size-10 hover:backdrop-brightness-90 hover:outline-2">
              <AvatarImage src={`${avatarUrl}`} />
              <AvatarFallback>{name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="">
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-muted-foreground">
                  <Link
                    className="hover:underline hover:underline-offset-2 text-black font-bold"
                    href={`/${username}`}
                    onClick={handleUsernameClick}
                  >
                    @{username}
                  </Link>
                  · {timeago}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {DeletingStatus ? (
                      <Loader></Loader>
                    ) : (
                      <MoreHorizontal className="w-4 h-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {session?.user.username === username && (
                    <DropdownMenuItem
                      onClick={async (e) => {
                        setDeletingStatus(true);
                        e.stopPropagation();
                        if (publicIdArray.length > 0) {
                          await axios.delete(`/api/post/media/`, {
                            data: {
                              publicIdArray,
                            },
                          });
                        }
                        deletePost(id);

                        setDeletingStatus(true);
                        if (pathname == `/${username}/post/${id}`) {
                          router.replace("/home");
                        }
                      }}
                      className="font-bold"
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                  {session.user.username != username && (
                    <DropdownMenuItem
                      className="font-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Block @{username}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2 whitespace-pre-wrap pl-2">{content}</div>
            {images && images.length > 0 && (
              <CardContent className="pl-2 mt-2.5">
                <Imagespace images={images} />
              </CardContent>
            )}
          </div>
        </CardHeader>

        {/* {tags?.length ? (
      <CardContent className="flex flex-wrap gap-2 mt-2 px-6">
      {tags.slice(0, 3).map((tag) => (
        <Badge variant="outline" key={tag}>
        #{tag}
        </Badge>
        ))}
        {tags.length > 3 && (
          <span className="text-sm text-muted-foreground">
          ...and {tags.length - 3} more
          </span>
          )}
          </CardContent>
          ) : null} */}

        <CardFooter className="flex justify-between px-6 pl-14 mt-2 pb-1 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-4 h-4" />
            <span>6</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Repeat2 className="w-4 h-4" />
            <span>122</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-1 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
            <span>183</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
