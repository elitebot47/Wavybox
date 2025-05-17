"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  //to avoid making client with every render
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
