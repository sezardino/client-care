import { LIMIT_SEARCH_PARAM, PAGE_SEARCH_PARAM } from "@/const/search-params";
import { BasicHydrationBoundary } from "@/libs/react-query/hydration-boundary-helper";
import { getTableSearchParams } from "@/utils/get-table-search-params";
import { isSubmissionStatus } from "@/utils/is-submission-status";
import { ProjectSubmissionsTemplate } from "./components/template";
import { SUBMISSION_STATUS_FILTER_PARAM_NAME } from "./const";
import { getProjectSubmissionsQuery } from "./hooks/project-submissions";

type Props = {
  params: { id: string };
  searchParams: {
    [PAGE_SEARCH_PARAM]?: string;
    [LIMIT_SEARCH_PARAM]?: string;
    [SUBMISSION_STATUS_FILTER_PARAM_NAME]?: string;
  };
};

const Page = (props: Props) => {
  const { searchParams, params } = props;
  const { page, limit } = getTableSearchParams(searchParams);
  const { data: status } = isSubmissionStatus.safeParse(
    searchParams[SUBMISSION_STATUS_FILTER_PARAM_NAME]
  );

  return (
    <BasicHydrationBoundary
      queries={[
        getProjectSubmissionsQuery({
          page,
          limit,
          projectId: params.id,
          status,
        }),
      ]}
    >
      <main>
        <ProjectSubmissionsTemplate />
      </main>
    </BasicHydrationBoundary>
  );
};

export default Page;
