import RightSideBar from "./rightSidebar";
import LeftSideBar from "./leftSidebar";
// HomeLayout.tsx
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full px-4 md:px-8">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:items-center lg:justify-center lg:w-[250px] z-[30] sticky top-0 h-screen">
        <LeftSideBar />
      </aside>

      {/* Main Feed */}
      <main className="w-full max-w-[600px] border-x z-[20] border-gray-200 min-h-screen">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:block xl:w-[290px] z-[20] sticky top-0 h-screen">
        <RightSideBar />
      </aside>
    </div>
  );
}
