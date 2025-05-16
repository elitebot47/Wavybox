"use client";
import {
  BellIcon,
  LucideHash,
  LucideHome,
  LucideSettings2,
  MessageCircleDashed,
} from "lucide-react";
import SidebarButton from "../ui/lsidebarbutton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/explore", icon: LucideHash, label: "Explore" },
  { href: "/notifications", icon: BellIcon, label: "Notifications" },
  { href: "/home", icon: LucideHome, label: "Home" },
  { href: "/messages", icon: MessageCircleDashed, label: "Messages" },
  { href: "/settings", icon: LucideSettings2, label: "Settings" },
];

export default function DownBar({ className }) {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <div
      className={`flex justify-around items-center  h-16 border-t-2 border-black  ${className}`}
    >
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} aria-label={label}>
          <SidebarButton
            icon={Icon}
            className={`border-0 shadow-none h-auto ${
              pathname === href
                ? "bg-gradient-to-b from-black to-gray-700 shadow-2xl shadow-black text-white"
                : ""
            }`}
          />
        </Link>
      ))}
      <Link href={`${session.user.username}`} aria-label={"My profile"}>
        <SidebarButton
          avatarUrl={`${session.user.avatarUrl}`}
          className={` shadow-none h-auto p-1  border-2 border-gray-400 ${
            pathname === `${session.user.id}`
              ? "shadow-2xl border-2 shadow-black text-white border-black"
              : ""
          }`}
        />
      </Link>
    </div>
  );
}
