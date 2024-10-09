"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import {
  NewOrganizationFormSchema,
  NewOrganizationFormValues,
} from "@/schemas/organization";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";

type NewOrganizationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewOrganizationFormValues) => void;
};

export const NewOrganizationForm = (props: NewOrganizationFormProps) => {
  const { onFormSubmit, className, ...rest } = props;

  const form = useForm<NewOrganizationFormValues>({
    resolver: zodResolver(NewOrganizationFormSchema),
  });

  const onSubmit = (data: NewOrganizationFormValues) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("space-y-4 md:space-y-6", className)}
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
                label="Name"
                placeholder="Black cat"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field, fieldState }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Slug"
                errorMessage={fieldState.error?.message}
                placeholder="black-cat"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
