import { Separator } from "@/components/ui/separator";
import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";

export default async function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:w-[95vw] mx-auto md:px-16 ">
      <aside className="hidden  md:block md:basis-2/7   ">
        <LeftSideBar></LeftSideBar>
      </aside>
      <div>
        <Separator
          orientation="vertical"
          className="hidden md:block w-px h-auto "
        ></Separator>
      </div>
      <main className="flex-3/7  justify-center   ">{children}</main>
      <div>
        <Separator
          orientation="vertical"
          className="hidden md:block w-px h-auto "
        ></Separator>
      </div>
      <aside className="hidden  md:block md:basis-2/7">
        <RightSideBar></RightSideBar>
      </aside>
    </div>
  );
}
