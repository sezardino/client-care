import { useServerQuery } from "@/libs/react-query/helpers";
import { getProjectWidgets } from "../actions/project-widgets";

export const PROJECT_WIDGETS_QUERY_KEY = "project-widgets-query-key";

export const getProjectWidgetsQuery = (id: string) => ({
  queryKey: [PROJECT_WIDGETS_QUERY_KEY, id],
  queryFn: async () => getProjectWidgets(id),
  enabled: !!id,
});

export const useProjectWidgetsQuery = (id: string) =>
  useServerQuery(getProjectWidgetsQuery(id));
