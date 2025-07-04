import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import LeftSideBar from "@/components/layout/leftSidebar";
import RightSideBar from "@/components/layout/rightSidebar";
import AnimationLayout from "@/components/animationlayout";
import Modals from "@/components/modal";
import DownBar from "@/components/layout/downbar";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  return (
    <AnimationLayout>
      <div className="flex justify-center w-full  sm:px-8">
        <aside className="hidden lg:flex lg:items-center lg:justify-center lg:w-[250px] z-30 sticky top-0 h-screen">
          <LeftSideBar />
        </aside>
        <aside className="lg:hidden block">
          <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-[200]">
            <DownBar className=" justify-around items-center shadow-2xl shadow-black bg-white " />
          </div>
        </aside>
        <Modals></Modals>
          <main className="w-full max-w-[600px] border-x z-50 border-gray-200 min-h-screen">
            {children}
          </main>

        <aside className="hidden lg:block xl:w-[290px] z-30 sticky top-0 h-screen">
          <RightSideBar />
        </aside>
      </div>
    </AnimationLayout>
  );
}
