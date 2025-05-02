import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";

export default async function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <aside className="flex-1/3">
        <LeftSideBar></LeftSideBar>
      </aside>
      <main className="flex-1/3">{children}</main>
      <aside className="flex-1/3">
        <RightSideBar></RightSideBar>
      </aside>
    </div>
  );
}
