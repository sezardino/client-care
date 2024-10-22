"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import {
  NewOrganizationDto,
  NewOrganizationDtoSchema,
} from "@/schemas/dto/organization";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { ImageFormField } from "../ui/image-field";

type NewOrganizationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewOrganizationDto) => void;
};

export const NewOrganizationForm = (props: NewOrganizationFormProps) => {
  const { onFormSubmit, className, ...rest } = props;

  const form = useForm<NewOrganizationDto>({
    resolver: zodResolver(NewOrganizationDtoSchema),
  });

  const onSubmit = (data: NewOrganizationDto) => {
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
              placeholderType="building"
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
                label="Name"
                placeholder="Next-blog"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extra"
          render={({ field }) => (
            <FormItem>
              <Input
                {...field}
                type="text"
                label="Extra"
                placeholder="Platform for blogging"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
