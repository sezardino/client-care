import { z } from "zod";

export const FeedbackWidgetDtoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  rating: z.number().min(1).max(5),
});

export type FeedbackWidgetDto = z.infer<typeof FeedbackWidgetDtoSchema>;
