import { useServerQuery } from "@/libs/react-query/helpers";
import { getProjectSubmissions } from "../actions/project-submissions";

export const PROJECT_SUBMISSIONS_QUERY_KEY = "project-submissions-query-key";

type Args = {
  projectId: string;
  page?: number;
  limit?: number;
};

export const getProjectSubmissionsQuery = (args: Args) => ({
  queryKey: [
    PROJECT_SUBMISSIONS_QUERY_KEY,
    args.projectId,
    args.page,
    args.limit,
  ],
  queryFn: async () => getProjectSubmissions(args),
  enabled: !!args.projectId,
});

export const useProjectSubmissionsQuery = (args: Args) =>
  useServerQuery(getProjectSubmissionsQuery(args));
