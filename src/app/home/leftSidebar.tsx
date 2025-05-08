import SidebarButton from "@/components/ui/lsidebarbutton";
import {
  BellIcon,
  LucideHash,
  LucideHome,
  LucideSettings2,
  MessageCircleDashed,
  WavesIcon,
} from "lucide-react";
export default function LeftSideBar() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <SidebarButton icon={WavesIcon} />
      <SidebarButton icon={LucideHome} label="Home" />
      <SidebarButton icon={LucideHash} label="Explore" />
      <SidebarButton icon={BellIcon} label="Notifications" />
      <SidebarButton icon={MessageCircleDashed} label="Messages" />
      <SidebarButton icon={LucideSettings2} label="Settings" />
      <SidebarButton
        className="justify-center bg-black text-white"
        label="Post"
      />
    </div>
  );
}
