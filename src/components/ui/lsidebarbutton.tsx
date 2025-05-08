import { Button } from "./button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface SidebarButtonProps extends ComponentProps<typeof Button> {
  icon?: LucideIcon;
  label?: string;
}

export default function SidebarButton({
  icon: Icon,
  label,
  className,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      className={cn(
        "w-[200px] flex justify-start gap-2 text-lg p-3 items-center h-16 rounded-full hover:bg-black hover:text-white transition-all duration-300 border-black shadow-gray-400 bg-white text-black",
        className
      )}
      {...props}
    >
      {Icon && <Icon size={35} />}
      {label}
    </Button>
  );
}
