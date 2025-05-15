"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        {children}

        <Toaster position="top-center" richColors />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
