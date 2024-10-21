import { LayoutWithAside } from "@/components/layout/with-aside";
import { ProjectUrls } from "@/const/url";
import { PropsWithChildren } from "react";

const links = [{ name: "User Profile", href: ProjectUrls.userSettings }];

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutWithAside title="User Settings" links={links}>
      {children}
    </LayoutWithAside>
  );
};

export default Layout;
