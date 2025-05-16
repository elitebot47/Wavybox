"use client";

import SidebarButton from "@/components/ui/lsidebarbutton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname } from "next/navigation";
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
  const userid = session?.user.id;

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <div className="w-[230px] h-24 flex border-2 rounded-lg px-3 gap-1.5">
        <div className="flex justify-center items-center">
          <Link href={`${session.user.username}`} aria-label={"My profile"}>
            <SidebarButton
              avatarUrl={`${session.user.avatarUrl}`}
              className={` shadow-none h-auto p-1  border-2 border-gray-400`}
            />
          </Link>
        </div>
        <div className="w-24 flex flex-col justify-center ">
          <div>{session.user.name}</div>
          <div>@{session.user.username}</div>
        </div>
        <div
          className="flex px-2
         justify-center items-center"
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AlignJustify></AlignJustify>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex justify-center items-center p-0 rounded-lg overflow-hidden ">
                <SignOutButton className="w-full text-lg  p-2 transition-all duration-500  text-black hover:bg-gray-900 hover:text-white"></SignOutButton>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
