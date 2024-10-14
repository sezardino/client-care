import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { z } from "zod";

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_AVATAR_SIZE_MB = 5;
const MAX_FILE_SIZE = mbToBites(MAX_AVATAR_SIZE_MB);

const MAX_ORGANIZATION_NAME_LENGTH = 50;
const MAX_ORGANIZATION_URL_LENGTH = 50;
const MAX_ORGANIZATION_DESCRIPTION_LENGTH = 100;

export const NewProjectDtoSchema = z.object({
  name: z
    .string({
      required_error: "Organization name is required",
    })
    .min(1, { message: "Name must not be empty" })
    .max(MAX_ORGANIZATION_NAME_LENGTH, {
      message: "Name must not exceed 50 characters",
    }),
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
  url: z
    .string({ required_error: "Url is required" })
    .url("Invalid url")
    .max(
      MAX_ORGANIZATION_URL_LENGTH,
      `Max length of this field is ${MAX_ORGANIZATION_URL_LENGTH} characters`
    ),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required")
    .max(
      MAX_ORGANIZATION_DESCRIPTION_LENGTH,
      `Max length of this field is ${MAX_ORGANIZATION_DESCRIPTION_LENGTH} characters`
    ),
});

export type NewProjectDto = z.infer<typeof NewProjectDtoSchema>;
