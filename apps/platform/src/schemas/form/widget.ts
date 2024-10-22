import { DOMAIN_REGEXP } from "@/const/regexp";
import { z } from "zod";

const MAX_WIDGET_NAME_LENGTH = 50;

export const WidgetFormSchema = z.object({
  name: z
    .string({
      required_error: "Widget name is required",
    })
    .min(1, { message: "Name must not be empty" })
    .max(MAX_WIDGET_NAME_LENGTH, {
      message: `Name must not exceed ${MAX_WIDGET_NAME_LENGTH} characters`,
    }),
  domains: z.array(z.string().regex(DOMAIN_REGEXP, "Invalid domain")),
  isActive: z.boolean({
    required_error: "This field is required",
  }),
});

export type WidgetFormValues = z.infer<typeof WidgetFormSchema>;
