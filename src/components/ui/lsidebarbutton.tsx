import { Button } from "./button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface SidebarButtonProps extends ComponentProps<typeof Button> {
  icon?: LucideIcon;
  label?: string;
  avatarUrl?: string;
}

export default function SidebarButton({
  icon: Icon,
  label,
  avatarUrl,
  className,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      className={cn(
        "max-w-[200px] flex justify-start gap-2 text-2xl p-3  h-16 rounded-full  lg:hover:bg-black/80 lg:hover:text-white transition-all duration-300 border-black items-center shadow-gray-400 bg-white border-2  text-black",
        className
      )}
      {...props}
    >
      {avatarUrl && (
        <div className="rounded-full  h-auto">
          <img
            alt="Profile picture"
            width={35}
            height={35}
            src={avatarUrl}
          ></img>
        </div>
      )}
      {Icon && <Icon className="size-6" />}
      {label && <div className="">{label}</div>}
    </Button>
  );
}
