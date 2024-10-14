import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { z } from "zod";

const mbToBites = (mb: number) => mb * 1024 * 1024;

const MAX_IMAGE_SIZE_MB = 5;
const MAX_FILE_SIZE = mbToBites(MAX_IMAGE_SIZE_MB);

export const ImageDtoSchema = z.object({
  image: z
    .instanceof(File, { message: "Invalid input" })

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, or .webp files are accepted."
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_IMAGE_SIZE_MB}MB.`
    ),
});

export type ImageDto = z.infer<typeof ImageDtoSchema>;
