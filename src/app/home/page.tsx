import { SignOutButton } from "@/components/ui/SignButtons";
import { auth } from "@/lib/auth";

export default async function () {
  const session = await auth();
  return (
    <div className="flex justify-between">
      <div>feed page or home page</div>
      <div>{session && <SignOutButton></SignOutButton>}</div>
    </div>
  );
}
