import { OrganizationLayout } from "@/components/layout/organization";
import { ProjectUrls } from "@/const/url";
import { redirect } from "next/navigation";
import Script from "next/script";
import { PropsWithChildren } from "react";
import { getCurrentUserData } from "../actions/current-user";

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUserData();

  if ("message" in user) redirect(ProjectUrls.login);
  if (!user.organizationId) redirect(ProjectUrls.newOrganization);

  return (
    <>
      <OrganizationLayout>{children}</OrganizationLayout>
      {/* #ts-ignore */}
      <feedback-widget token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJjbTJhbXJzdXgwMDAwaHdlN2sya2ppOWd6Iiwib3JnYW5pemF0aW9uSWQiOiJjbTI4MDd5ZHAwMDAzZzZzNGZydGR1czNmIiwid2lkZ2V0SWQiOiJjbTJkaDAzZm0wMDAwMTE1YmhqdWd1OGFuIiwiaWF0IjoxNzI5MTc5NzkzLCJleHAiOjMzMjU1MjIyMTkzfQ.QCxhoWoRkm2s6I2ccv0b_LY0_8ZvEx-RT57ed-W1bGM"></feedback-widget>
      <Script src="https://client-care-widget-dev.vercel.app/widget.umd.js" />
    </>
  );
};

export default Layout;
