"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { WidgetStatusDto, WidgetStatusDtoSchema } from "@/schemas/dto/widget";
import { cn } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { SwitchBox } from "../ui/switch-box";

export type WidgetStatusFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: WidgetStatusDto) => void;
  initialValues?: Partial<WidgetStatusDto>;
};

export const WidgetStatusForm = (props: WidgetStatusFormProps) => {
  const { onFormSubmit, initialValues, className, ...rest } = props;

  const form = useForm<WidgetStatusDto>({
    resolver: zodResolver(WidgetStatusDtoSchema),
    defaultValues: {
      isActive:
        typeof initialValues?.isActive !== "undefined"
          ? initialValues?.isActive
          : false,
    },
  });

  const onSubmit = (data: WidgetStatusDto) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="isActive"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <SwitchBox
                {...field}
                isSelected={value}
                title="Widget Status"
                description="Toggle the status to either activate or deactivate the widget on your site."
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
