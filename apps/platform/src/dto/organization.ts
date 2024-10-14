import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { z } from "zod";

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_AVATAR_SIZE_MB = 5;
const MAX_FILE_SIZE = mbToBites(MAX_AVATAR_SIZE_MB);

const MAX_ORGANIZATION_NAME_LENGTH = 50;
const MAX_ORGANIZATION_EXTRA_LENGTH = 50;

export const NewOrganizationDtoSchema = z.object({
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
  extra: z
    .string()
    .max(
      MAX_ORGANIZATION_EXTRA_LENGTH,
      `Max length of this field is ${MAX_ORGANIZATION_EXTRA_LENGTH} characters`
    )
    .optional(),
});

export type NewOrganizationDto = z.infer<typeof NewOrganizationDtoSchema>;
