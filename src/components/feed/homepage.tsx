"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Postform from "./postform";
import { useSession } from "next-auth/react";
import PostArea from "./postarea";
import FollowingPosts from "./followingpostarea";
import { motion } from "framer-motion";
export default function HomePage({ initialposts }) {
  const [allposts, setAllPosts] = useState(true);
  const { data: session } = useSession();
  return (
    <div className="flex flex-col  ">
      <div className="relative flex w-full border-b border-gray-300">
        <button
          onClick={() => setAllPosts(true)}
          className={` flex justify-center hover:bg-gray-50 items-center w-1/2 h-10 text-sm  font-medium transition-colors  ${
            allposts ? "text-black" : "text-gray-500"
          }`}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="inline-block "
          >
            All
          </motion.span>
        </button>
        <button
          onClick={() => setAllPosts(false)}
          className={`w-1/2 h-10 text-sm hover:bg-gray-50 font-medium transition-colors ${
            !allposts ? "text-black" : "text-gray-500"
          }`}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="inline-block "
          >
            Following
          </motion.span>
        </button>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute bottom-0 h-0.5 w-1/2 bg-black"
          style={{
            left: allposts ? "0%" : "50%",
          }}
        />
      </div>
      <Postform className="lg:flex hidden" userid={session?.user?.id} />

      {allposts ? (
        <PostArea
          initialposts={initialposts}
          queryKey={["allposts"]}
          queryParams={{}}
        />
      ) : (
        <FollowingPosts posts={initialposts} />
      )}
    </div>
  );
}
