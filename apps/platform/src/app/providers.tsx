"use client";

import { getQueryClient } from "@/libs/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "sonner";

export const ClientProviders = (props: PropsWithChildren) => {
  const [queryClient] = useState(getQueryClient());
  const router = useRouter();

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>{props.children}</NextUIProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};
