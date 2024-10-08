import { LandingLayout } from "@/components/layout/landing";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
