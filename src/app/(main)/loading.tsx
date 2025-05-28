import Loader from "@/components/ui/loader";

export default async function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loader className="w-8 h-8" />
    </div>
  );
}
