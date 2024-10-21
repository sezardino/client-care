import { LayoutWithAside } from "@/components/layout/with-aside";
import { ProjectUrls } from "@/const/url";
import { PropsWithChildren } from "react";

const links = [{ name: "Basic", href: ProjectUrls.settings }];

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutWithAside title="Organization Settings" links={links}>
      {children}
    </LayoutWithAside>
  );
};

export default Layout;
