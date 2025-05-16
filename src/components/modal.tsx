"use client";

import { usePostModalStore } from "@/store/postStore";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Postform from "./feed/postform";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function Modals() {
  const { data: session } = useSession();
  const userid = session?.user.id;
  const { isOpen, openModal, closeModal } = usePostModalStore();

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 px-2 bg-black/70 backdrop-blur-xs flex justify-center items-start pt-12 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 500 }}
            onClick={() => closeModal()}
          >
            <motion.div
              className="  bg-white rounded-xl shadow-lg max-w-xl w-full overflow-hidden"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
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

              <Postform
                className="shadow-none border-0 outline-0"
                userid={userid}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-20 right-20 z-50">
        <Button
          onClick={() => openModal()}
          size="icon"
          className="absolute w-16 h-16  rounded-full"
        >
          <Plus className="size-7"></Plus>
        </Button>
      </div>
    </div>
  );
}
