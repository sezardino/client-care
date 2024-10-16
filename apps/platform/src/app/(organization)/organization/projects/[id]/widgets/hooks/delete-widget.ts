import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { PROJECT_QUERY_KEY } from "../../hooks/project";
import { deleteWidget } from "../actions/delete-widget";
import { PROJECT_WIDGETS_QUERY_KEY } from "./project-widgets";

export const useDeleteWidgetMutation = () =>
  useServerMutation({
    mutationFn: async (id: string) => deleteWidget(id),
    onSuccess: () => toast.success("Widget successfully deleted"),
    getQueriesToInvalidate: () => [
      [PROJECT_WIDGETS_QUERY_KEY],
      [PROJECT_QUERY_KEY],
    ],
  });
