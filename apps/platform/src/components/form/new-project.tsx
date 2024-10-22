"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { NewProjectDto, NewProjectDtoSchema } from "@/schemas/dto/project";
import { cn, Input, Textarea } from "@nextui-org/react";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ImageFormField } from "../ui/image-field";

export type NewProjectFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewProjectDto) => void;
};

export const NewProjectForm = (props: NewProjectFormProps) => {
  const { onFormSubmit, className, ...rest } = props;

  const form = useForm<NewProjectDto>({
    resolver: zodResolver(NewProjectDtoSchema),
  });

  const onSubmit = (data: NewProjectDto) => {
    onFormSubmit(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    form.setValue("logo", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleDeleteImage = () => {
    form.setValue("logo", undefined!, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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
          name="logo"
          render={({ field: { onBlur } }) => (
            <ImageFormField
              placeholderType="folder"
              onBlur={onBlur}
              onChange={handleImageChange}
              onDelete={handleDeleteImage}
              className="mx-auto"
            />
          )}
        />

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
              <FormDescription>
                Give your project a unique and descriptive name.
              </FormDescription>
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
              <FormDescription>
                Specify the URL where this project will be hosted. Ensure
                it&apos;s accurate.
              </FormDescription>
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
      </form>
    </Form>
  );
};
