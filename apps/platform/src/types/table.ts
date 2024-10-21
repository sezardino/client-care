import { Submission, Widget } from "@prisma/client";

export type WidgetTable = Pick<
  Widget,
  "id" | "name" | "isActive" | "type" | "createdAt"
> & { submissionsCount: number };

export type SubmissionTable = Pick<
  Submission,
  "id" | "email" | "createdAt" | "status" | "fullName"
> & {
  widget: Pick<Widget, "type" | "name" | "isActive">;
};
