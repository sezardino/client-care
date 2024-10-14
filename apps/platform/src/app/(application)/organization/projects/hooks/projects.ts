import { useServerQuery } from "@/libs/react-query/helpers";
import { getOrganizationProjects } from "../actions/projects";

export const ORGANIZATION_PROJECTS_QUERY_KEY =
  "organization-projects-query-key";

export const organizationProjectsQuery = {
  queryKey: [ORGANIZATION_PROJECTS_QUERY_KEY],
  queryFn: async () => getOrganizationProjects(),
};

export const useOrganizationProjectsQuery = () =>
  useServerQuery(organizationProjectsQuery);
