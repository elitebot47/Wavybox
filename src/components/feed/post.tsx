"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { UserPost } from "@/types";
import Imagespace from "./imagespace"; // Custom image grid

export default function Post({
  username,
  content,
  name,
  createdAt,
  userId,
  images,
  tags,
}: UserPost & { tags?: string[] }) {
  const timeago = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <Card className="  w-full max-w-2xl pb-1 pt-1 mx-auto rounded-none">
      <CardHeader className="flex flex-row gap-3 items-start">
        {/* <Avatar>
          <AvatarImage src={`/avatars /${userId}.jpg`} />
          <AvatarFallback>{name?.[0] ?? "U"}</AvatarFallback>
        </Avatar> */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-sm text-muted-foreground">
                @{username} · {timeago}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 whitespace-pre-wrap">{content}</div>
        </div>
      </CardHeader>

      {images && images.length > 0 && (
        <CardContent className="px-6">
          <Imagespace images={images} />
        </CardContent>
      )}

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

      <CardFooter className="flex justify-between px-6 text-muted-foreground">
        <Button variant="ghost" size="sm" className="flex gap-1 items-center">
          <MessageCircle className="w-4 h-4" />
          <span>6</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1 items-center">
          <Repeat2 className="w-4 h-4" />
          <span>122</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex gap-1 items-center">
          <Heart className="w-4 h-4" />
          <span>183</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Bookmark className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
