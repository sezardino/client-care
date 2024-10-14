"use client";

import { getQueryClient } from "@/libs/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "sonner";

export const ClientProviders = (props: PropsWithChildren) => {
  const [queryClient] = useState(getQueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{props.children}</NextUIProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};
