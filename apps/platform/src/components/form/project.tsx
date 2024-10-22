"use client";

import {
  ProjectSettingsDto,
  ProjectSettingsDtoSchema,
} from "@/schemas/dto/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn, Input, Textarea } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

type ProjectFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: ProjectSettingsDto) => void;
  initialValues: Partial<ProjectSettingsDto>;
};

export const ProjectForm = (props: ProjectFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;

  const form = useForm<ProjectSettingsDto>({
    resolver: zodResolver(ProjectSettingsDtoSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: ProjectSettingsDto) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("grid grid-cols-1 gap-4 md:gap-6", className)}
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
                label="Project Name"
                placeholder="Enter the project name"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Project URL"
                placeholder="Enter the project URL"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Textarea
                {...field}
                type="text"
                label="Description"
                placeholder="Enter a brief description"
              />
              <FormDescription>
                Describe the project and its purpose. This will help you and
                your team to stay aligned.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          color="primary"
          isDisabled={!form.formState.isDirty}
          className="ml-auto"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
