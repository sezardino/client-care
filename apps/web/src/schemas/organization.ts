import { z } from "zod";

export const NewOrganizationFormSchema = z.object({
  name: z
    .string({ required_error: "Organization name is required" })
    .min(1, { message: "Name must not be empty" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  slug: z
    .string({ required_error: "Organization slug is required" })
    .min(1, { message: "Slug must not be empty" })
    .max(50, { message: "Slug must not exceed 50 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug can only contain lowercase letters, numbers, and hyphens, and must not start or end with a hyphen.",
    }),
});

export type NewOrganizationFormValues = z.infer<
  typeof NewOrganizationFormSchema
>;
