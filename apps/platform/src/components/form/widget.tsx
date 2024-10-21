"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { MAX_PROJECT_ACTIVE_WIDGETS_COUNT } from "@/const/limits";
import { NewWidgetDto, NewWidgetDtoSchema } from "@/dto/widget";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { SwitchBox } from "../ui/switch-box";

export type WidgetFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewWidgetDto) => void;
  initialValues?: Partial<NewWidgetDto>;
  isCopy?: boolean;
};

export const WidgetForm = (props: WidgetFormProps) => {
  const { isCopy, onFormSubmit, initialValues, className, ...rest } = props;

  const form = useForm<NewWidgetDto>({
    resolver: zodResolver(NewWidgetDtoSchema),
    defaultValues: {
      name:
        typeof initialValues?.name !== "undefined"
          ? isCopy
            ? `${initialValues.name} Copy`
            : initialValues.name
          : "",
      isActive:
        typeof initialValues?.isActive !== "undefined"
          ? initialValues.isActive
          : false,
    },
  });

  const onSubmit = (data: NewWidgetDto) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Widget Name"
                placeholder="Feedback Form"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <SwitchBox
                {...field}
                isSelected={value}
                title="Activate this widget?"
                description={`You can activate up to ${MAX_PROJECT_ACTIVE_WIDGETS_COUNT} widgets at the same time. Active widgets work on specific domains and have unlimited submissions.`}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
