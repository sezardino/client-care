import { LIMIT_SEARCH_PARAM, PAGE_SEARCH_PARAM } from "@/const/search-params";
import { getQueryClientForHydration } from "@/libs/react-query";
import { getTableSearchParams } from "@/utils/get-table-search-params";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectWidgetsTemplate } from "./components/template";
import { getProjectWidgetsQuery } from "./hooks/project-widgets";

type Props = {
  params: { id: string };
  searchParams: {
    [PAGE_SEARCH_PARAM]?: string;
    [LIMIT_SEARCH_PARAM]?: string;
  };
};

const Page = async (props: Props) => {
  const { params, searchParams } = props;
  const { page, limit } = getTableSearchParams(searchParams);

  const queryClient = getQueryClientForHydration();
  await queryClient.prefetchQuery(
    getProjectWidgetsQuery({ projectId: params.id, page, limit })
  );
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
