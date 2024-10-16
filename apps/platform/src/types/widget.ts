import { Widget } from "@prisma/client";

export type ProjectWidget = Pick<
  Widget,
  "id" | "name" | "isActive" | "isTest" | "type" | "createdAt"
> & { submissionsCount: number };
