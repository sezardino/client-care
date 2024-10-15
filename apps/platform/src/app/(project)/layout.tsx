import { ProjectLayout } from "@/components/layout/project";
import { ProjectUrls } from "@/const/url";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  if ("message" in user) redirect(ProjectUrls.login);
  if (!user.organizationId) redirect(ProjectUrls.newOrganization);

  return <ProjectLayout>{children}</ProjectLayout>;
};

export default Layout;
