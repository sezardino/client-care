export const formatWidgetSnippet = (snippet: string) => {
  return snippet.replace(/"[^"]*"/g, '"..."');
};
