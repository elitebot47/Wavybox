"use client";
import { motion } from "framer-motion";
import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <motion.div className="flex items-center justify-center min-h-screen w-full">
      <Loader />
    </motion.div>
  );
}
