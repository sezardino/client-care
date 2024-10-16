import { ToastInner } from "@/components/ui/toast-inner";
import { ServerActionError, ServerActionResponse } from "@/types/base";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

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
  const { mutationFn, onSuccess, onError, getQueriesToInvalidate, ...rest } =
    args;
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: Arguments) => {
      const result = await mutationFn(args);

      if (typeof result === "object" && result !== null && "message" in result)
        throw result;

      return result as Response;
    },
    onError: (error, ...rest) => {
      if (onError) return onError(error, ...rest);

      toast.success(
        <ToastInner message={error.message} errors={error.errors} />
      );
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
