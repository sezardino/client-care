import { ApplicationLayout } from "@/components/layout/application-layout";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <ApplicationLayout>{children}</ApplicationLayout>;
};

export default Layout;
