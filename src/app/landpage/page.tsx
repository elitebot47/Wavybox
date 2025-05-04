import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandPage() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col gap-4">
          <Button className="w-40 bg-black text-white hover:bg-gray-800">
            <Link href={"/signin"}>Sign in</Link>
          </Button>
          <Button className="w-40 bg-blue-600 text-white hover:bg-blue-500">
            <Link href={"/signup"}>Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
