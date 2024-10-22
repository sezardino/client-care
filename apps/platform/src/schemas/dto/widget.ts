import { z } from "zod";
import { WidgetFormSchema } from "../form/widget";

export const CreateWidgetDtoSchema = WidgetFormSchema.extend({
  projectId: z.string(),
});

export type CreateWidgetDto = z.infer<typeof CreateWidgetDtoSchema>;

export const WidgetStatusDtoSchema = z.object({
  isActive: z.boolean({
    required_error: "This field is required",
  }),
});

export const WidgetStatusDtoSchemaWithProjectId = WidgetStatusDtoSchema.extend({
  widgetId: z.string(),
});

export type WidgetStatusDtoWithProjectId = z.infer<
  typeof WidgetStatusDtoSchemaWithProjectId
>;
export type WidgetStatusDto = z.infer<typeof WidgetStatusDtoSchema>;
