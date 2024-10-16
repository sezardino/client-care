import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { PROJECT_QUERY_KEY } from "../../hooks/project";
import { deleteWidget } from "../actions/delete-widget";
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

export const useDeleteWidgetMutation = () =>
  useServerMutation({
    mutationFn: async (id: string) => deleteWidget(id),
    onSuccess: () => toast.success("Widget successfully deleted"),
    getQueriesToInvalidate: () => [
      [PROJECT_WIDGETS_QUERY_KEY],
      [PROJECT_QUERY_KEY],
    ],
  });
