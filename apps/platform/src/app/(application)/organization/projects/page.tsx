import { getQueryClientForHydration } from "@/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { OrganizationProjectsTemplate } from "./components/template";
import { organizationProjectsQuery } from "./hooks/projects";

const Page = async () => {
  const queryClient = getQueryClientForHydration();
  const response = await queryClient.fetchQuery(organizationProjectsQuery);
  const dehydratedState = dehydrate(queryClient);

  if ("message" in response) throw new Error(response.message);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main>
        <OrganizationProjectsTemplate />
      </main>
    </HydrationBoundary>
  );
};

export default Page;
