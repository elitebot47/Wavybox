import RightSideBar from "./rightSidebar";
import LeftSideBar from "./leftSidebar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full px-4 md:px-8">
      {/* Left Sidebar */}
      <aside className="hidden lg:block lg:w-[250px] sticky top-0 h-screen">
        <LeftSideBar />
      </aside>

      {/* Main Feed */}
      <main className="w-full max-w-[600px] border-x border-gray-200 min-h-screen">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:block xl:w-[290px] sticky top-0 h-screen">
        <RightSideBar />
      </aside>
    </div>
  );
}
