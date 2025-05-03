import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";
export default async function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:w-[90vw] mx-auto md:px-16">
      <aside className="hidden  md:block md:basis-1/5">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="flex-2/5">{children}</main>
      <aside className="hidden  md:block md:basis-2/5">
        <RightSideBar></RightSideBar>
      </aside>
    </div>
  );
}
