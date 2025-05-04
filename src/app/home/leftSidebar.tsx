import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col gap-2  py-14 pr-4 m-auto h-full ">
      <div>
        <SidebarButton icon={WavesIcon}></SidebarButton>
      </div>
      <SidebarButton icon={LucideHome} label="Home"></SidebarButton>
      <SidebarButton icon={LucideHash} label="Explore"></SidebarButton>
      <SidebarButton icon={BellIcon} label="Notifications"></SidebarButton>
      <SidebarButton
        icon={MessageCircleDashed}
        label="Messages"
      ></SidebarButton>
      <SidebarButton icon={LucideSettings2} label="Settings"></SidebarButton>
      <SidebarButton label="Post"></SidebarButton>
    </div>
  );
}
