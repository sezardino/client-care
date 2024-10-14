import { ApplicationLayout } from "@/components/layout/application";
import { ProjectUrls } from "@/const/url";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  if ("message" in user) redirect(ProjectUrls.login);
  if (!user.organizationId) redirect(ProjectUrls.newOrganization);

  return <ApplicationLayout>{children}</ApplicationLayout>;
};

export default Layout;
