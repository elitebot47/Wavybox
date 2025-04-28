import { auth, signIn, signOut } from "@/lib/auth";
import { SignInButton, SignOutButton } from "@/components/ui/SignInButton";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      {session?.user?.name}
      <br />
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
