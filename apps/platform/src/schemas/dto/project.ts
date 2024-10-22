import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { z } from "zod";

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_AVATAR_SIZE_MB = 5;
const MAX_FILE_SIZE = mbToBites(MAX_AVATAR_SIZE_MB);

const MAX_PROJECT_NAME_LENGTH = 50;
const MAX_PROJECT_URL_LENGTH = 50;
const MAX_PROJECT_DESCRIPTION_LENGTH = 100;

const nameSchema = z
  .string({
    required_error: "Project name is required",
  })
  .min(1, { message: "Name must not be empty" })
  .max(MAX_PROJECT_NAME_LENGTH, {
    message: "Name must not exceed 50 characters",
  });

const urlSchema = z
  .string({ required_error: "Url is required" })
  .url("Invalid url")
  .max(
    MAX_PROJECT_URL_LENGTH,
    `Max length of this field is ${MAX_PROJECT_URL_LENGTH} characters`
  );
const descriptionSchema = z
  .string({ required_error: "Description is required" })
  .min(1, "Description is required")
  .max(
    MAX_PROJECT_DESCRIPTION_LENGTH,
    `Max length of this field is ${MAX_PROJECT_DESCRIPTION_LENGTH} characters`
  );
export const NewProjectDtoSchema = z.object({
  name: nameSchema,
  logo: z
    .instanceof(File, { message: "Logo is required" })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, or .webp files are accepted."
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_AVATAR_SIZE_MB}MB.`
    ),
  url: urlSchema.optional(),
  description: descriptionSchema.optional(),
});

export type NewProjectDto = z.infer<typeof NewProjectDtoSchema>;

export const ProjectSettingsDtoSchema = z.object({
  name: nameSchema.optional(),
  url: urlSchema.optional(),
  description: descriptionSchema.optional(),
});

export type ProjectSettingsDto = z.infer<typeof ProjectSettingsDtoSchema>;
