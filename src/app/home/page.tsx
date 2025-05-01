// app/feed/page.tsx

"use server";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/ui/SignButtons";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex justify-between">
      <div>home page</div>
      <div>{`hello, ${session?.user?.username}`}</div>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
