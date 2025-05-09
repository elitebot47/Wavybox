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
        "w-[200px] flex justify-start gap-2 text-2xl p-3  h-16 rounded-full hover:bg-black/80 hover:text-white transition-all duration-300 border-black items-center shadow-gray-400 bg-white border-2  text-black",
        className
      )}
      {...props}
    >
      <div>{Icon && <Icon className="size-6" />}</div>
      <div>{label}</div>
    </Button>
  );
}
