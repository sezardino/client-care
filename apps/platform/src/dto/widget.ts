import { z } from "zod";

const MAX_WIDGET_NAME_LENGTH = 50;

export const NewWidgetDtoSchema = z.object({
  name: z
    .string({
      required_error: "Widget name is required",
    })
    .min(1, { message: "Name must not be empty" })
    .max(MAX_WIDGET_NAME_LENGTH, {
      message: `Name must not exceed ${MAX_WIDGET_NAME_LENGTH} characters`,
    }),
  isTest: z.boolean({
    required_error: "This field is required",
  }),
});

export const NewWidgetDtoSchemaWithProjectId = NewWidgetDtoSchema.extend({
  projectId: z.string(),
});

export type NewWidgetDtoWithProjectId = z.infer<
  typeof NewWidgetDtoSchemaWithProjectId
>;
export type NewWidgetDto = z.infer<typeof NewWidgetDtoSchema>;

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
