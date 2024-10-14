"use client";

import { RegistrationDto, RegistrationDtoSchema } from "@/dto/auth";

import { CustomError } from "@/types/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, Input } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { Typography } from "../ui/typography";

type RegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: RegistrationDto) => void;
  errors?: CustomError[];
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { errors, onFormSubmit, className, ...rest } = props;

  const form = useForm<RegistrationDto>({
    resolver: zodResolver(RegistrationDtoSchema),
  });

  const onSubmit = (data: RegistrationDto) => {
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
            {errors.map((error, index) => (
              <li key={index}>
                <Typography level="span" className="text-red-400">
                  {error.message}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </form>
    </Form>
  );
};
