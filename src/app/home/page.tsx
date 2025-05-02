"use server";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex ">
      <div>home page</div>
      <div>{`hello, ${session?.user?.username}`}</div>
    </div>
  );
}
