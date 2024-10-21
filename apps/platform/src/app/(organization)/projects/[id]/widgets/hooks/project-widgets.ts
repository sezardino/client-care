import { getProjectWidgets } from "@/actions/widgets/project-widgets";
import { useServerQuery } from "@/libs/react-query/helpers";

export const PROJECT_WIDGETS_QUERY_KEY = "project-widgets-query-key";

type Args = {
  projectId: string;
  page?: number;
  limit?: number;
};

export const getProjectWidgetsQuery = (args: Args) => ({
  queryKey: [PROJECT_WIDGETS_QUERY_KEY, args.projectId, args.page, args.limit],
  queryFn: async () => getProjectWidgets(args),
  enabled: !!args.projectId,
});

export const useProjectWidgetsQuery = (args: Args) =>
  useServerQuery(getProjectWidgetsQuery(args));
