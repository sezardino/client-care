import { getQueryClientForHydration } from "@/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectWidgetsTemplate } from "./components/template";
import { getProjectWidgetsQuery } from "./hooks/project-widgets";

type Props = {
  params: { id: string };
};

const Page = async (props: Props) => {
  const { params } = props;

  const queryClient = getQueryClientForHydration();
  await queryClient.prefetchQuery(getProjectWidgetsQuery(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main>
        <ProjectWidgetsTemplate />
      </main>
    </HydrationBoundary>
  );
};

export default Page;
