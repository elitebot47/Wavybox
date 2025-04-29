// app/feed/page.tsx
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/ui/SignButtons";

export default async function FeedPage() {
  const session = await auth();

  if (!session) {
    // You could redirect like this in App Router
    return <p>Access Denied</p>;
  }

  return (
    <div className="flex justify-between">
      <div>Feed page or home page</div>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
