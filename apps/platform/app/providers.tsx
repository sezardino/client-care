"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export const ClientProviders = (props: PropsWithChildren) => (
  <NextUIProvider>{props.children}</NextUIProvider>
);
