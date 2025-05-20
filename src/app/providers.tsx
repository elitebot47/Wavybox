"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { useMediaQuery } from "react-responsive";
import { useMobileStore } from "@/store/isMobileStore";
export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  const { setIsMobile } = useMobileStore();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        {children}

        <Toaster position={isMobile ? "top-center" : "top-center"} richColors />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
