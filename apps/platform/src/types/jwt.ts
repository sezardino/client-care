export type JWTWidgetPayload = {
  organizationId: string;
  projectId: string;
  widgetId: string;
};

export type NextErrorSegment = {
  error: Error & { digest?: string };
  reset: () => void;
};
