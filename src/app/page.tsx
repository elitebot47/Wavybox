import { auth, signIn, signOut } from "@/lib/auth";
import { SignInButton, SignOutButton } from "@/components/ui/SignButtons";
import { redirect } from "next/navigation";
import landPage from "./landpage/page";
import LandPage from "./landpage/page";
export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user?.email}
      <div>
        <div>{session && <SignOutButton></SignOutButton>}</div>
        <div>{!session && <LandPage />}</div>
      </div>
    </div>
  );
}
