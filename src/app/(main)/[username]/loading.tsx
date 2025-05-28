"use client";
import { motion } from "framer-motion";
import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Loader className="w-8 h-8" />
    </motion.div>
  );
}
