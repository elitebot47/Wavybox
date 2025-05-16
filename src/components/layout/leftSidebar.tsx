"use client";

import { Button } from "@/components/ui/button";
import SidebarButton from "@/components/ui/lsidebarbutton";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  LucideHash,
  LucideHome,
  LucideSettings2,
  MessageCircleDashed,
  WavesIcon,
} from "lucide-react";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { usePostModalStore } from "@/store/postStore";

export default function LeftSideBar() {
  const { isOpen, openModal, closeModal } = usePostModalStore();

  const pathname = usePathname();
  const { data: session } = useSession();
  const userid = session?.user.id;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div className="flex   flex-col items-center justify-center gap-2 h-full">
      <SidebarButton
        icon={WavesIcon}
        onClick={() => window.location.reload()}
      />
      <Link href={"/home"}>
        <SidebarButton
          icon={LucideHome}
          label="Home"
          className={pathname == "/home" ? "bg-black text-white" : ""}
        />
      </Link>
      <Link href={"/explore"}>
        <SidebarButton
          icon={LucideHash}
          label="Explore"
          className={pathname == "/explore" ? "bg-black text-white" : ""}
        />
      </Link>
      <Link href={"/notifications"}>
        <SidebarButton
          icon={BellIcon}
          label="Notifications"
          className={pathname == "/notifications" ? "bg-black text-white" : ""}
        />
      </Link>
      <Link href={"/messages"}>
        <SidebarButton
          icon={MessageCircleDashed}
          label="Messages"
          className={pathname == "/messages" ? "bg-black text-white" : ""}
        />
      </Link>
      <Link href={"/settings"}>
        <SidebarButton
          icon={LucideSettings2}
          label="Settings"
          className={pathname == "/settings" ? "bg-black text-white" : ""}
        />
      </Link>
      <SidebarButton
        onClick={() => openModal()}
        className="justify-center bg-black text-white"
        label="Post"
      />
    </div>
  );
}
