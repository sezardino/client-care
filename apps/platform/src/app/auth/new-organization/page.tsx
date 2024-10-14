import { getCurrentUserData } from "@/app/actions/current-user";
import { ProjectUrls } from "@/const/url";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { NewOrganizationTemplate } from "./components/template";

export const metadata: Metadata = { title: "Create new organization" };

const Page = async () => {
  const user = await getCurrentUserData();

  if (!user || "message" in user) redirect(ProjectUrls.login);
  if (user.organizationId) redirect(ProjectUrls.dashboard);

  return (
    <main>
      <NewOrganizationTemplate />
    </main>
  );
};

export default Page;
