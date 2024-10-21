import { changeWidgetStatus } from "@/actions/widgets/change-widget-status";
import { WidgetStatusDtoWithProjectId } from "@/dto/widget";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { PROJECT_WIDGETS_QUERY_KEY } from "./project-widgets";

export const useChangeWidgetStatusMutation = () =>
  useServerMutation({
    mutationFn: async (dto: WidgetStatusDtoWithProjectId) =>
      changeWidgetStatus(dto),
    onSuccess: () => toast.success("Widget status successfully changed"),
    getQueriesToInvalidate: () => [[PROJECT_WIDGETS_QUERY_KEY]],
  });
