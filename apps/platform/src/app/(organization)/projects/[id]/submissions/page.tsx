import { LIMIT_SEARCH_PARAM, PAGE_SEARCH_PARAM } from "@/const/search-params";
import { BasicHydrationBoundary } from "@/libs/react-query/hydration-boundary-helper";
import { getTableSearchParams } from "@/utils/get-table-search-params";
import { ProjectSubmissionsTemplate } from "./components/template";
import { getProjectSubmissionsQuery } from "./hooks/project-submissions";

type Props = {
  params: { id: string };
  searchParams: {
    [PAGE_SEARCH_PARAM]?: string;
    [LIMIT_SEARCH_PARAM]?: string;
  };
};

const Page = (props: Props) => {
  const { searchParams, params } = props;
  const { page, limit } = getTableSearchParams(searchParams);
  console.log({ searchParams, limit });
  return (
    <BasicHydrationBoundary
      queries={[
        getProjectSubmissionsQuery({ page, limit, projectId: params.id }),
      ]}
    >
      <main>
        <ProjectSubmissionsTemplate />
      </main>
    </BasicHydrationBoundary>
  );
};

export default Page;
