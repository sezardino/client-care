import { SubmissionStatus } from "@prisma/client";
import { z } from "zod";

export const CancelDeclineSubmissionDtoSchema = z.object({
  id: z.string().cuid(),
  status: z.enum([SubmissionStatus.NEW, SubmissionStatus.PROCESSED]),
});

export type CancelDeclineSubmissionDto = z.infer<
  typeof CancelDeclineSubmissionDtoSchema
>;

export const ProjectSubmissionsDtoSchema = z.object({
  projectId: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
  status: z.nativeEnum(SubmissionStatus).optional(),
  search: z.string().optional(),
});

export type ProjectSubmissionsDto = z.infer<typeof ProjectSubmissionsDtoSchema>;
