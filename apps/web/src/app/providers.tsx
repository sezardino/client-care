"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export const ClientProviders = (props: PropsWithChildren) => (
  <ClerkProvider>
    <NextUIProvider>{props.children}</NextUIProvider>
  </ClerkProvider>
);
