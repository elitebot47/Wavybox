// components/Loader.tsx
import { Loader2 } from "lucide-react"; // Optional: lucide-react spinner icon

export default function Loader({}) {
  return (
    <div className="flex items-center justify-center   ">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>
  );
}
