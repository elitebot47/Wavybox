"use client";

import Postform from "@/components/feed/postform";
import { Button } from "@/components/ui/button";
import SidebarButton from "@/components/ui/lsidebarbutton";
import {
  BellIcon,
  LucideHash,
  LucideHome,
  LucideSettings2,
  MessageCircleDashed,
  Plus,
  WavesIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
export default function LeftSideBar() {
  const { data: session } = useSession();
  const userid = session?.user.id;
  const [postModal, setPostModal] = useState(false);
  useEffect(() => {
    if (postModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [postModal]);
  return (
    <div>
      <AnimatePresence>
        {postModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs flex justify-center items-start pt-12 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPostModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg max-w-xl w-full overflow-hidden"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                <Button
                  size="icon"
                  onClick={() => setPostModal(false)}
                  className=" group rounded-full hover:shadow-lg border-0 shadow-none bg-transparent  hover:scale-110"
                >
                  <Plus className="group-hover:text-white   transition-colors rotate-45 size-6 text-black " />
                </Button>
              </div>

              <Postform
                className="shadow-none border-0 outline-0"
                userid={userid}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex   flex-col items-center justify-center gap-2 h-full">
        <SidebarButton icon={WavesIcon} />
        <SidebarButton icon={LucideHome} label="Home" />
        <SidebarButton icon={LucideHash} label="Explore" />
        <SidebarButton icon={BellIcon} label="Notifications" />
        <SidebarButton icon={MessageCircleDashed} label="Messages" />
        <SidebarButton icon={LucideSettings2} label="Settings" />
        <SidebarButton
          onClick={() => setPostModal(true)}
          className="justify-center bg-black text-white"
          label="Post"
        />
      </div>
    </div>
  );
}
