"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { useMediaQuery } from "react-responsive";
export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        {children}

        <Toaster
          position={isMobile ? "bottom-center" : "top-center"}
          richColors
        />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
