"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { MAX_PROJECT_ACTIVE_WIDGETS_COUNT } from "@/const/limits";
import { WidgetFormSchema, WidgetFormValues } from "@/schemas/form/widget";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { SwitchBox } from "../ui/switch-box";

export type WidgetFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: WidgetFormValues) => void;
  initialValues?: Partial<WidgetFormValues>;
  isCopy?: boolean;
};

export const WidgetForm = (props: WidgetFormProps) => {
  const { isCopy, onFormSubmit, initialValues, className, ...rest } = props;

  const form = useForm<WidgetFormValues>({
    resolver: zodResolver(WidgetFormSchema),
    defaultValues: {
      name:
        typeof initialValues?.name !== "undefined"
          ? isCopy
            ? `${initialValues.name} Copy`
            : initialValues.name
          : "",
      domains: initialValues?.domains?.length ? initialValues.domains : [""],
      isActive:
        typeof initialValues?.isActive !== "undefined"
          ? initialValues.isActive
          : false,
    },
  });

  const onSubmit = (data: WidgetFormValues) => {
    onFormSubmit(data);
  };

  const addDomainHandler = () =>
    form.setValue("domains", [...form.getValues("domains"), ""]);
  const deleteDomain = (domain: string) =>
    form.setValue(
      "domains",
      form.getValues("domains").filter((d) => d !== domain)
    );

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

        {JSON.stringify(form.getValues("domains"))}

        <FormField
          control={form.control}
          name="domains"
          render={({ field: { value } }) => (
            <>
              {value.map((value, number) => (
                <FormField
                  key={number}
                  control={form.control}
                  name={`domains.${number}`}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        type="text"
                        label="Domain"
                        placeholder="Enter domain for widget"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </>
          )}
        />
      </form>
    </Form>
  );
};
