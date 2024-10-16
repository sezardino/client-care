import { jwtGenerate } from "@/libs/jwt";

const getWidgetCodeSnippetString = (token: string): string[] => [
  `<feedback-widget token="${token}"></feedback-widget>`,
  `<script src="${process.env.WIDGET_SCRIPT_PATH}" />`,
];

export const generateWidgetCodeSnippet = (widgetData: {
  widgetId: string;
  projectId: string;
  organizationId: string;
}): string[] => {
  const { organizationId, projectId, widgetId } = widgetData;

  const token = jwtGenerate({
    payload: { projectId, organizationId, widgetId },
  });

  return getWidgetCodeSnippetString(token);
};
