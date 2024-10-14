import { useServerQuery } from "@/libs/react-query/helpers";
import { getCurrentUserData } from "../actions/current-user";

export const CURRENT_USER_QUERY_KEY = "current-user-query-key";

export const currentUserQuery = {
  queryKey: [CURRENT_USER_QUERY_KEY],
  queryFn: async () => getCurrentUserData(),
};

export const useCurrentUserQuery = () => useServerQuery(currentUserQuery);
