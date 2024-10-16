import { DEFAULT_ITEMS_PER_PAGE } from "@/const/base";
import { getQueryClientForHydration } from "@/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectWidgetsTemplate } from "./components/template";
import { getProjectWidgetsQuery } from "./hooks/project-widgets";

type Props = {
  params: { id: string };
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const Page = async (props: Props) => {
  const { params, searchParams } = props;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || DEFAULT_ITEMS_PER_PAGE;

  const queryClient = getQueryClientForHydration();
  await queryClient.prefetchQuery(
    getProjectWidgetsQuery({ id: params.id, page, limit })
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
