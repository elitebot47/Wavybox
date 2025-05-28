import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className=" w-full flex justify-center mx-auto my-auto h-full items-center">
      <Loader2
        className={clsx("animate-spin  h-5 w-5 text-black", className)}
      />
    </div>
  );
}
