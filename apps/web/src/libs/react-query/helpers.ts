import { ServerActionError, ServerActionResponse } from "@/types/base";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

type UseServerMutationArguments<Response, Arguments> = Omit<
  UseMutationOptions<Response, ServerActionError, Arguments>,
  "mutationFn"
> & {
  mutationFn: (args: Arguments) => Promise<ServerActionResponse<Response>>;
};

export const useServerMutation = <Response, Arguments = undefined>(
  args: UseServerMutationArguments<Response, Arguments>
): UseMutationResult<Response, ServerActionError, Arguments> => {
  const { mutationFn, ...rest } = args;

  return useMutation({
    mutationFn: async (args: Arguments) => {
      const result = await mutationFn(args);

      if (typeof result === "object" && result !== null && "message" in result)
        throw result;

      return result as Response;
    },
    ...rest,
  });
};
