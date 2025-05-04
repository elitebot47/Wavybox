import LsbButton from "@/components/ui/lsidebarbutton";
import {
  Bell,
  Hash,
  Home,
  LucideEqualApproximately,
  MessageCircleDashed,
  Settings2,
} from "lucide-react";

export default function LeftSideBar() {
  return (
    <div className="flex flex-col gap-2  py-14 pr-4 ">
      <div>
        <LsbButton icon={LucideEqualApproximately}></LsbButton>
      </div>
      <LsbButton icon={Home}>Home</LsbButton>
      <LsbButton icon={Hash}>Explore</LsbButton>
      <LsbButton icon={Bell}>Notifications</LsbButton>
      <LsbButton icon={MessageCircleDashed}>Messages</LsbButton>
      <LsbButton icon={Settings2}>Settings</LsbButton>
      <LsbButton className="justify-center">Post</LsbButton>
    </div>
  );
}
