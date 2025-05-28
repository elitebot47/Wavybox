"use client";
import { lazy, Suspense, useState } from "react";
const PostArea = lazy(() => import("./postarea"));
const FollowingPosts = lazy(() => import("./followingpostarea"));
import Postform from "./postform";
// import PostArea from "./postarea";
// import FollowingPosts from "./followingpostarea";
import { AnimatePresence, motion } from "framer-motion";
import { useMobileStore } from "@/store/isMobileStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Loader from "../ui/loader";

export default function HomePage({ initialposts }) {
  const { ismobile } = useMobileStore();
  console.log(ismobile);

  const scrollDirection = useScrollDirection();
  const [allposts, setAllPosts] = useState(true);
  return (
    <div className="flex flex-col w-full   ">
      <motion.div
        animate={{
          y: !ismobile ? 0 : scrollDirection === "down" ? -100 : 0,
          opacity: !ismobile ? 1 : scrollDirection === "down" ? 0 : 1,
        }}
        className="backdrop-blur-sm fixed h-14 max-w-[599px] lg:h-10 flex z-50 w-full border-b border-gray-300"
      >
        <button
          onClick={() => setAllPosts(true)}
          className={` flex justify-center lg:hover:bg-gray-50 items-center  flex-1  text-sm  font-medium transition-colors  ${
            allposts ? "text-black" : "text-gray-500"
          }`}
        >
          <motion.span className="inline-block text-lg  ">All</motion.span>
        </button>
        <button
          onClick={() => setAllPosts(false)}
          className={` flex justify-center lg:hover:bg-gray-50 items-center  flex-1  text-sm  font-medium transition-colors  ${
            !allposts ? "text-black" : "text-gray-500"
          }`}
        >
          <motion.span className="inline-block text-lg ">Following</motion.span>
        </button>

        <motion.div
          animate={{
            x: allposts ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="absolute bottom-0 h-0.5 w-1/2 bg-black"
          style={{
            left: "0%",
          }}
        />
      </motion.div>
      {!ismobile && (
        <Postform className={`lg:mt-10 ${!allposts && "border-b"} `} />
      )}
      <Suspense
        fallback={
          <div className=" min-h-full flex justify-center items-center h-full">
            <Loader className="h-7 w-7"></Loader>
          </div>
        }
      >
        <div className="mt-14 lg:mt-0  overflow-hidden ">
          <AnimatePresence mode="wait">
            {allposts && (
              <motion.div
                key="allposts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostArea
                  initialposts={initialposts}
                  queryKey={["allposts"]}
                  queryParams={{}}
                />
              </motion.div>
            )}
            {!allposts && (
              <motion.div
                key="following"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FollowingPosts posts={initialposts} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Suspense>
    </div>
  );
}
