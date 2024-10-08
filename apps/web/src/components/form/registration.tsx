"use client";

import { RegistrationFormSchema, RegistrationFormValues } from "@/schemas/auth";

import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, Input } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { Typography } from "../ui/typography";

type RegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: RegistrationFormValues) => void;
  errors?: ClerkAPIError[];
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { errors, onFormSubmit, className, ...rest } = props;

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
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
          name="email"
          render={({ field }) => (
            <Input {...field} type="email" label="Email" placeholder="Email" />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Password"
              placeholder="Password"
            />
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Repeat password"
              placeholder="Repeat password"
            />
          )}
        />

        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>
                <Typography level="span" className="text-red-400">
                  {el.longMessage}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </form>
    </Form>
  );
};
