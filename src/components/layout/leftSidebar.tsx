"use client";

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

const navItems = [
  { href: "/home", icon: LucideHome, label: "Home" },
  { href: "/explore", icon: LucideHash, label: "Explore" },
  { href: "/notifications", icon: BellIcon, label: "Notifications" },
  { href: "/messages", icon: MessageCircleDashed, label: "Messages" },
  { href: "/settings", icon: LucideSettings2, label: "Settings" },
];

export default function LeftSideBar() {
  const { isOpen, openModal } = usePostModalStore();
  const pathname = usePathname();
  const { data: session } = useSession();
  const userid = session?.user.id;

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <SidebarButton
        icon={WavesIcon}
        onClick={() => window.location.reload()}
      />
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href}>
          <SidebarButton
            icon={Icon}
            label={label}
            className={`w-[200px] ${
              pathname === href ? "bg-black text-white" : ""
            }`}
          />
        </Link>
      ))}
      <SidebarButton
        onClick={openModal}
        className="w-[150px] justify-center bg-black text-white"
        label="Post"
      />
    </div>
  );
}
