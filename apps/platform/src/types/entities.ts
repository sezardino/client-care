import {
  Contact,
  Feedback,
  File,
  Report,
  Submission,
  Survey,
  Widget,
} from "@prisma/client";

export type SubmissionDetails = Pick<
  Submission,
  "id" | "email" | "status" | "createdAt" | "phone" | "fullName"
> & {
  widget: Pick<Widget, "name" | "type" | "isTest" | "isActive">;
  feedback: Pick<Feedback, "message" | "rating"> | null;
  report:
    | (Pick<Report, "message"> & {
        files: Pick<File, "createdAt" | "publicPath">[];
      })
    | null;
  survey: Pick<Survey, "options" | "satisfaction"> | null;
  contact: Pick<Contact, "message" | "subject"> | null;
};
