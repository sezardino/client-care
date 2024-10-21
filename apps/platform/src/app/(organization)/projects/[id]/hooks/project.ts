import { getProjectData } from "@/actions/projects/project";
import { useServerQuery } from "@/libs/react-query/helpers";

export const PROJECT_QUERY_KEY = "project-query-key";

export const getProjectQuery = (id: string) => ({
  queryKey: [PROJECT_QUERY_KEY, id],
  queryFn: async () => getProjectData(id),
  enabled: !!id,
});

export const useProjectQuery = (id: string) =>
  useServerQuery(getProjectQuery(id));
