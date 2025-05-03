import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";

export default async function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:w-[95vw] mx-auto md:px-16">
      <aside className="hidden  md:block md:basis-2/7">
        <LeftSideBar></LeftSideBar>
      </aside>
      <div className="w-px bg-gray-300 h-auto mx-2" />{" "}
      <main className="flex-3/7 px-3 justify-center ">{children}</main>
      <div className="w-px bg-gray-300 h-auto mx-2" />{" "}
      <aside className="hidden  md:block md:basis-2/7">
        <RightSideBar></RightSideBar>
      </aside>
    </div>
  );
}
