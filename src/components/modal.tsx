"use client";

import { usePostModalStore } from "@/store/postStore";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Postform from "./feed/postform";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useMobileStore } from "@/store/isMobileStore";
import { useEffect } from "react";

export default function Modals() {
  const { ismobile } = useMobileStore();
  const { isOpen, openModal, closeModal } = usePostModalStore();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 lg:px-2   bg-black/70 backdrop-brightness-50 backdrop-blur-xs lg:backdrop-blur-xs flex justify-center items-start pt-12 z-[210]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !ismobile && closeModal()}
          >
            <motion.div
              className="  bg-white lg:rounded-xl rounded-none shadow-lg lg:max-w-xl lg:w-full  w-screen  overflow-hidden"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 700 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2">
                <Button
                  size="icon"
                  onClick={() => closeModal()}
                  className=" group rounded-full hover:shadow-lg border-0 shadow-none lg:bg-transparent  hover:scale-110"
                >
                  <Plus className="group-hover:text-white   transition-colors rotate-45 size-6 lg:text-black " />
                </Button>
              </div>

              <Postform className="shadow-none border-0 outline-0" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {ismobile && !isOpen && (
        <div className="fixed bottom-35 right-20 z-[500]">
          <Button
            onClick={() => openModal()}
            size="icon"
            className="absolute w-16 h-16  rounded-full"
          >
            <Plus className="size-7"></Plus>
          </Button>
        </div>
      )}
    </div>
  );
}
