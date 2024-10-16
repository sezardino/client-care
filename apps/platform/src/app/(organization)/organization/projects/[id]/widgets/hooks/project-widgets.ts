import { useServerQuery } from "@/libs/react-query/helpers";
import { getProjectWidgets } from "../actions/project-widgets";

export const PROJECT_WIDGETS_QUERY_KEY = "project-widgets-query-key";

type Args = {
  id: string;
  page?: number;
  limit?: number;
};

export const getProjectWidgetsQuery = (args: Args) => ({
  queryKey: [PROJECT_WIDGETS_QUERY_KEY, args.id, args.page, args.limit],
  queryFn: async () => getProjectWidgets(args),
  enabled: !!args.id,
});

export const useProjectWidgetsQuery = (args: Args) =>
  useServerQuery(getProjectWidgetsQuery(args));
