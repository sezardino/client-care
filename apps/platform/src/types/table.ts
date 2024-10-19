import { Submission, Widget } from "@prisma/client";

export type WidgetTable = Pick<
  Widget,
  "id" | "name" | "isActive" | "isTest" | "type" | "createdAt"
> & { submissionsCount: number };

export type SubmissionTable = Pick<
  Submission,
  "id" | "email" | "createdAt" | "status"
> & {
  widget: Pick<Widget, "type" | "name" | "isActive" | "isTest">;
};
