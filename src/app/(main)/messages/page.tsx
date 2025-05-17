import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function Messages() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <div>messages</div>;
    </Suspense>
  );
}
