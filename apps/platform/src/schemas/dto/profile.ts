import { z } from "zod";

export const ProfileDtoSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  position: z.string().optional(),
});

export type ProfileDto = z.infer<typeof ProfileDtoSchema>;
