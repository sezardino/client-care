import { useServerQuery } from "@/libs/react-query/helpers";
import { getWidgetCodeSnippet } from "../actions/widget-code-snippet";

export const WIDGET_CODE_SNIPPET = "project-widgets-query-key";

export const getWidgetSnippetQuery = (id: string) => ({
  queryKey: [WIDGET_CODE_SNIPPET, id],
  queryFn: async () => getWidgetCodeSnippet(id),
  enabled: !!id,
});

export const useWidgetCodeSnippetQuery = (id: string) =>
  useServerQuery(getWidgetSnippetQuery(id));
