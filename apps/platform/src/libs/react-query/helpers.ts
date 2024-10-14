import { ServerActionError, ServerActionResponse } from "@/types/base";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type UseServerMutationArguments<Response, Arguments> = Omit<
  UseMutationOptions<Response, ServerActionError, Arguments>,
  "mutationFn"
> & {
  mutationFn: (args: Arguments) => Promise<ServerActionResponse<Response>>;
  getQueriesToInvalidate?: (data: Response, variables: Arguments) => QueryKey[];
};

export const useServerMutation = <Response, Arguments = undefined>(
  args: UseServerMutationArguments<Response, Arguments>
): UseMutationResult<Response, ServerActionError, Arguments> => {
  const { mutationFn, onSuccess, getQueriesToInvalidate, ...rest } = args;
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: Arguments) => {
      const result = await mutationFn(args);

      if (typeof result === "object" && result !== null && "message" in result)
        throw result;

      return result as Response;
    },
    onSuccess: (data, response, ctx) => {
      onSuccess?.(data, response, ctx);

      const queriesToInvalidate =
        getQueriesToInvalidate?.(data, response) || [];

      queriesToInvalidate.forEach((query) =>
        client.invalidateQueries({ queryKey: query })
      );
    },
    ...rest,
  });
};

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
