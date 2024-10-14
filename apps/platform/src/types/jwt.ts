export type JWTWidgetPayload = {
  organizationId: string;
  projectId: string;
};

export type NextErrorSegment = {
  error: Error & { digest?: string };
  reset: () => void;
};
