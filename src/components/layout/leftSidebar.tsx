"use client";

import SidebarButton from "@/components/ui/lsidebarbutton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { redirect, usePathname } from "next/navigation";
import {
  AlignJustify,
  BellIcon,
  LucideHash,
  LucideHome,
  LucideSettings2,
  MessageCircleDashed,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePostModalStore } from "@/store/postStore";
import { SignOutButton } from "../ui/SignButtons";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";

const navItems = [
  { href: "/home", icon: LucideHome, label: "Home" },
  { href: "/explore", icon: LucideHash, label: "Explore" },
  { href: "/notifications", icon: BellIcon, label: "Notifications" },
  { href: "/messages", icon: MessageCircleDashed, label: "Messages" },
  { href: "/settings", icon: LucideSettings2, label: "Settings" },
];

export default function LeftSideBar() {
  const { openModal } = usePostModalStore();
  const pathname = usePathname();
  const { data: session } = useSession();
  if (!session) {
    redirect("/signin");
  }

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: easeOut }}
      className="flex flex-col items-center justify-center gap-2 h-full"
    >
      {session.user && (
        <div className="w-[230px] h-24 flex border-2 rounded-lg px-3 gap-1.5">
          <div className="flex justify-center items-center">
            <Link href={`/${session.user.username}`} aria-label={"My profile"}>
              <Image
                loading="eager"
                width={70}
                height={70}
                src={session.user.avatarUrl}
                alt="Profile"
              />
            </Link>
          </div>
          <div className="w-24 flex flex-col justify-center ">
            <Link
              className="text-2xl font-bold"
              href={`/${session.user.username}`}
            >
              {session.user.name}
            </Link>
            <div className="text-sm text-gray-500">
              @{session.user.username}
            </div>
          </div>
          <div
            className="flex px-2
          justify-center items-center"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:border-0 ring-0 outline-0">
                <AlignJustify className="size-8 cursor-pointer hover:scale-110"></AlignJustify>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="shadow-2xl shadow-black "
              >
                <DropdownMenuItem className=" flex justify-center items-center p-0  overflow-hidden ">
                  <SignOutButton className="w-full h-full"></SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
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
    </motion.div>
  );
}
