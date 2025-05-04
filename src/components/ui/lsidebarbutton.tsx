import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarButtonProps {
  icon?: LucideIcon;
  label?: string;
}

export default function SidebarButton({
  icon: Icon,
  label,
}: SidebarButtonProps) {
  return (
    <Button className="w-full flex items-center gap-2 p-3 bg-black h-14 rounded-full text-white  hover:bg-gray-700">
      {Icon && <Icon size={18} />}
      {label}
    </Button>
  );
}
