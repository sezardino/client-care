import { getProjectSubmissions } from "@/actions/submissions/project-submissions";
import { ProjectSubmissionsDto } from "@/dto/submissions";
import { useServerQuery } from "@/libs/react-query/helpers";

export const PROJECT_SUBMISSIONS_QUERY_KEY = "project-submissions-query-key";

export const getProjectSubmissionsQuery = (args: ProjectSubmissionsDto) => ({
  queryKey: [
    PROJECT_SUBMISSIONS_QUERY_KEY,
    args.projectId,
    args.page,
    args.limit,
    args.status,
    args.search,
  ],
  queryFn: async () => getProjectSubmissions(args),
  enabled: !!args.projectId,
});

export const useProjectSubmissionsQuery = (args: ProjectSubmissionsDto) =>
  useServerQuery(getProjectSubmissionsQuery(args));
