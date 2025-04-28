import { auth, signIn, signOut } from "@/lib/auth";
import { SignInButton, SignOutButton } from "@/components/ui/SignButtons";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      {session?.user?.email}
      <br />
      {session ? (
        <SignOutButton></SignOutButton>
      ) : (
        <SignInButton></SignInButton>
      )}
    </div>
  );
}
