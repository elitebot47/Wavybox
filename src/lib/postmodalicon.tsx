"use client";

import { Button } from "@/components/ui/button";
import { usePostModalStore } from "../store/postStore";
import { Plus } from "lucide-react";

export default function PostModalfunction() {
  const { openModal } = usePostModalStore();
  return (
    <div className="fixed bottom-20 right-20 z-50">
      <Button
        onClick={() => openModal()}
        size="icon"
        className="absolute w-16 h-16  rounded-full"
      >
        <Plus className="size-7"></Plus>
      </Button>
    </div>
  );
}
