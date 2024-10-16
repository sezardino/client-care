import { ToastInner } from "@/components/ui/toast-inner";
import { NewWidgetDtoWithProjectId } from "@/dto/widget";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { createWidget } from "../actions/create-widget";
import { PROJECT_QUERY_KEY } from "./project";

export const useCreateWidgetMutation = () =>
  useServerMutation({
    mutationFn: async (values: NewWidgetDtoWithProjectId) =>
      createWidget(values),
    onSuccess: () =>
      toast.success(<ToastInner message="Widget created successfully" />),
    getQueriesToInvalidate: (_, v) => [[PROJECT_QUERY_KEY, v.projectId]],
    onError: (error) =>
      toast.success(
        <ToastInner message={error.message} errors={error.errors} />
      ),
  });
