import { getCurrentUserData } from "@/actions/users/current-user";
import { OrganizationLayout } from "@/components/layout/organization";
import { ProjectUrls } from "@/const/url";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  if ("message" in user) redirect(ProjectUrls.login);
  if (!user.organizationId) redirect(ProjectUrls.newOrganization);

  return (
    <>
      <OrganizationLayout>{children}</OrganizationLayout>
    </>
  );
};

export default Layout;
