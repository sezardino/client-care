"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { NewWidgetDto, NewWidgetDtoSchema } from "@/dto/widget";
import { cn, Input, Switch } from "@nextui-org/react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";

export type NewWidgetFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: NewWidgetDto) => void;
  initialValues?: Partial<NewWidgetDto>;
  isCopy?: boolean;
};

export const NewWidgetForm = (props: NewWidgetFormProps) => {
  const { onFormSubmit, initialValues, className, ...rest } = props;

  const form = useForm<NewWidgetDto>({
    resolver: zodResolver(NewWidgetDtoSchema),
    defaultValues: {
      name:
        typeof initialValues?.name !== "undefined"
          ? `${initialValues.name} Copy`
          : "",
      isTest:
        typeof initialValues?.isTest !== "undefined"
          ? initialValues.isTest
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
          name="isTest"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <Switch
                {...field}
                isSelected={value}
                classNames={{
                  base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                  ),
                  wrapper: "p-0 h-4 overflow-visible",
                  thumb: cn(
                    "w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4"
                  ),
                }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-medium">Is this a test widget?</p>
                  <p className="text-tiny text-default-400">
                    Test widgets have limited submissions but can be used on any
                    domain for testing purposes. Non-test widgets work only on
                    specific domains and have unlimited submissions.
                  </p>
                </div>
              </Switch>
              {/* <Switch {...field} checked={value}>
              Is this a test widget?
              </Switch>
<FormDescription>
Test widgets have limited submissions but can be used on any domain for testing purposes. Non-test widgets work only on specific domains and have unlimited submissions.
</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
