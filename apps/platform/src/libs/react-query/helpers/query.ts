import { ServerActionError, ServerActionResponse } from "@/types/base";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type UseServerQueryArguments<Response> = Omit<
  UseQueryOptions<Response, ServerActionError>,
  "queryFn"
> & {
  queryFn: () => Promise<ServerActionResponse<Response>>;
  props?: Record<string, unknown>;
};

export const useServerQuery = <Response>(
  args: UseServerQueryArguments<Response>
): UseQueryResult<Response, ServerActionError> => {
  const { queryFn, queryKey, props, ...rest } = args;

  return useQuery({
    queryKey: [...queryKey, ...(props ? Object.values(props) : [])],
    queryFn: async () => {
      const result = await queryFn();

      if (typeof result === "object" && result !== null && "message" in result)
        throw result;

      return result as Response;
    },
    ...rest,
  });
};
