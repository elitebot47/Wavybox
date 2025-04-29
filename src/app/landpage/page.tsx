import { SignInButton, SignOutButton } from "@/components/ui/SignButtons";
import Link from "next/link";

export default function LandPage() {
  return (
    <div className="flex flex-col">
      <SignInButton></SignInButton>
      <Link href={"/signup"}>Signup</Link>
    </div>
  );
}
