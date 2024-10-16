import { ToastInner } from "@/components/ui/toast-inner";
import { NewWidgetDtoWithProjectId } from "@/dto/widget";
import { useServerMutation } from "@/libs/react-query/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWidget } from "../actions/create-widget";
import { PROJECT_WIDGETS_QUERY_KEY } from "../widgets/hooks/project-widgets";
import { WIDGET_CODE_SNIPPET } from "../widgets/hooks/widget-code-snippet";
import { PROJECT_QUERY_KEY } from "./project";

export const useCreateWidgetMutation = () => {
  const client = useQueryClient();

  return useServerMutation({
    mutationFn: async (values: NewWidgetDtoWithProjectId) =>
      createWidget(values),
    onSuccess: (res) => {
      client.setQueryData([WIDGET_CODE_SNIPPET, res.id], {
        snippet: res.snippet,
      });
      toast.success(<ToastInner message="Widget created successfully" />);
    },
    getQueriesToInvalidate: (_, v) => [
      [PROJECT_QUERY_KEY, v.projectId],
      [PROJECT_WIDGETS_QUERY_KEY, v.projectId],
    ],
    onError: (error) =>
      toast.success(
        <ToastInner message={error.message} errors={error.errors} />
      ),
  });
};
