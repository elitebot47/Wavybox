import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import LeftSideBar from "@/components/layout/leftSidebar";
import RightSideBar from "@/components/layout/rightSidebar";
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
    <div className="flex justify-center w-full  sm:px-8">
      <aside className="hidden lg:flex lg:items-center lg:justify-center lg:w-[250px] z-[30] sticky top-0 h-screen">
        <LeftSideBar />
      </aside>

      <main className="w-full max-w-[600px] border-x z-[20] border-gray-200 min-h-screen">
        {children}
      </main>

      <aside className="hidden xl:block xl:w-[290px] z-[20] sticky top-0 h-screen">
        <RightSideBar />
      </aside>
    </div>
  );
}
