"use client";

import { motion } from "framer-motion";
import React from "react";
export default function AnimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
