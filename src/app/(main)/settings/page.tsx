import Deleteuserbut from "@/components/ui/deleteuserbutton";
import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function Settings() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <div>
        <div>
          <Deleteuserbut></Deleteuserbut>
        </div>
        this is settings page
      </div>
    </Suspense>
  );
}
