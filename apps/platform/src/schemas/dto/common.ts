import { z } from "zod";

export const DtoWithIdSchema = z.object({
  id: z.string().cuid(),
});
