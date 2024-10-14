"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import {
  NewOrganizationDto,
  NewOrganizationDtoSchema,
} from "@/dto/organization";
import { Avatar, Button, cn, Input, Tooltip } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Typography } from "../ui/typography";

type NewOrganizationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewOrganizationDto) => void;
};

const FILE_INPUT_ID = "organization-logo";

export const NewOrganizationForm = (props: NewOrganizationFormProps) => {
  const { onFormSubmit, className, ...rest } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<NewOrganizationDto>({
    resolver: zodResolver(NewOrganizationDtoSchema),
  });

  const onSubmit = (data: NewOrganizationDto) => {
    onFormSubmit(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      form.setValue("logo", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const handleDeleteImage = () => {
    setLogoPreview(null);
    form.setValue("logo", undefined!, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
            <FormItem className="mx-auto">
              <div className="flex justify-center items-center relative">
                <Avatar
                  htmlFor={FILE_INPUT_ID}
                  as="label"
                  size="lg"
                  src={logoPreview || undefined}
                  fallback={
                    <Typography styling="h3" weight="medium">
                      Logo
                    </Typography>
                  }
                  className="cursor-pointer w-32 h-32"
                />
                {logoPreview && (
                  <Tooltip content="Delete">
                    <Button
                      color="danger"
                      type="button"
                      isIconOnly
                      size="sm"
                      className="absolute top-0 right-0"
                      onClick={handleDeleteImage}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                )}
              </div>

              <input
                ref={inputRef}
                name="logo"
                id={FILE_INPUT_ID}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                className="sr-only"
                onChange={handleImageChange}
                onBlur={onBlur}
              />

              <FormMessage className="text-center" />
            </FormItem>
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
